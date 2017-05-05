'use strict';
var app = angular.module("jspApp", ['ngRoute', 'firebase']);


app.run(["$rootScope", "$location", "$animate", function ($rootScope, $location, $animate) {
    $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $location.path("/")
        }
    })
    $animate.enabled(true);
}]);

app.config(['$routeProvider', function ($routeProvider, $routeParams) {
    $routeProvider
        .when('/', {
            templateUrl: "src/partials/login.html",
            controller: "loginController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$waitForSignIn();
                }]
            }
        })
        .when('/home', {
            templateUrl: "src/partials/home.html",
            controller: "MainController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when('/manager/home', {
            templateUrl: "src/partials/managerHome.html",
            controller: "managerController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when('/manager/projects', {
            templateUrl: "src/partials/managerApproved.html",
            controller: "projectController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when('/cashrequest', {
            templateUrl: "src/partials/cashRequest.html",
            controller: "CRController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when('/addparticulars/:id', {
            templateUrl: "src/partials/particulars.html",
            controller: "particularsController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when('/account', {
            templateUrl: "src/partials/particulars.html",
            controller: "AccountController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        })
        .when('/status/no', {
            templateUrl: "src/partials/no.html",
            controller: "NoController",
            resolve: {
                "currentAuth": ["Auth", function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });

    // $locationProvider.html5Mode(true);
}]);

app.factory('fireData', ["$firebaseArray", "$firebaseObject", "$rootScope",
    function ($firebaseArray, $firebaseObject, $rootScope) {
        var fireData = {};
        var CRnormal = "cashRequest";
        var CRmanager = "cashRequestManager";

        fireData.forNormaldata = function () {
            var ref = firebase.database().ref().child("cashRequest").child($rootScope.firebaseUser.uid);
            return $firebaseArray(ref);
        }

        fireData.managerdata = function () {
            var refs = firebase.database().ref().child("cashRequestManager");
            return $firebaseArray(refs);
        }
        fireData.equalmanagerdata = function (value) {
            var refs = firebase.database().ref().child("cashRequestManager");
            refs.orderByChild("status").equalTo(value).on("child_added", function (items) {
                //var items = $firebaseArray(snapshot)
                return items.val;
            });
        }
        fireData.addNormaldata = function () {

            var ref = firebase.database().ref().child("cashRequest").child($rootScope.firebaseUser.uid);
            var portalref = ref.push();

            return portalref;
        }
        fireData.addManagerdata = function () {
            var ref = firebase.database().ref().child("cashRequestManager");
            var portalref = ref.push();
            return portalref;
        }
        fireData.approveManager = function (filterValue) {

            var fb = new Firebase("https://jspapp-a43bf.firebaseio.com/" + CRmanager)
                .StartAt(filterValue)
                .endAt(filterValue)
                .once('value', function (snap) {
                    return snap.val();
                });
        }
        fireData.changestatus = function (id, userid) {
            var ref = firebase.database().ref().child("cashRequestManager").child(id).update({ status: "approved" }, onfrstComplete);
            function onfrstComplete(error) {
                if (error) {
                    console.log("first line Failed");
                } else {
                    console.log("first line succesfull");
                    var refdeep = firebase.database().ref().child("cashRequest").child(userid).child(id).update({ status: "approved" }, function onscndComplete(error) {
                        if (error) {
                            console.log("second line Failed");
                        }
                        else {
                            console.log("second line successful");
                        }
                    });


                }

            }
        }
        fireData.changestatusno = function (id, userid) {
            var ref = firebase.database().ref().child("cashRequestManager").child(id).update({ status: "no" }, onfrstComplete);
            function onfrstComplete(error) {
                if (error) {
                    console.log("first line Failed");
                } else {
                    console.log("first line succesfull");
                    var refdeep = firebase.database().ref().child("cashRequest").child(userid).child(id).update({ status: "no" },

                        function (error) {
                            if (error) {
                                console.log("second line Failed");
                            }
                            else {
                                console.log("second line successful");
                            }
                        });


                }

            }
        }
        fireData.editpurchase = function (id, userid, entrtyone, entrtytwo) {
            var ref = firebase.database().ref().child("cashRequestManager").child(id).update(entrtyone, onfrstComplete);
            function onfrstComplete(error) {
                if (error) {
                    console.log("first line Failed");
                } else {
                    console.log("first line succesfull");
                    var refdeep = firebase.database().ref().child("cashRequest").child(userid).child(id).update(entrtytwo,

                        function (error) {
                            if (error) {
                                console.log("second line Failed");
                            }
                            else {
                                console.log("second line successful");
                            }
                        });


                }

            }
        }

        return fireData;
    }]);
app.factory('fireParticular', ["$firebaseArray", "$rootScope", "fireData",
    function ($firebaseArray, $rootScope, fireData) {
        var fireParticular = {};
        fireParticular.writeNewParticular = function (childnode) {
            var ref = firebase.database().ref().child("particular").child(childnode);

            return $firebaseArray(ref);
        };
        fireParticular.getrecord = function (key) {
            var ref = firebase.database().ref().child("cashRequest").child($rootScope.firebaseUser.uid);
            var list = $firebaseArray(ref);
            console.log("stage one ", list);
            var record = list.$getRecord(key);
            console.log("stage one ", record);
            return record;

        };

        return fireParticular;

    }]);
app.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth) {
        return $firebaseAuth();
    }])
app.factory("fireMembership", ["Auth", "$rootScope", "$firebaseObject", function (Auth, $rootScope, $firebaseObject) {
    var fireMembership = {};

    fireMembership.giveRoles = function (uid) {
        var ref = firebase.database().ref();

        return $firebaseObject(ref.child("Roles").child(uid));
    }

    return fireMembership;
}])
app.controller('MainController', ['$scope', '$rootScope', '$location', 'Auth', 'fireData',
    function ($scope, $rootScope, $location, Auth, fireData) {
        Auth.$onAuthStateChanged(function (firebaseuser) {
            if (firebaseuser) {
                $rootScope.firebaseUser = firebaseuser;
            }
        });
        $rootScope.signOut = function () {
            Auth.$signOut();
            $rootScope.firebaseUser = false;
            $location.path("/");
        }
        var Breadcrumb = [{
            link: "",
            style: "",
            name: "Oparation Manager"
        }, {
            link: "#/home",
            style: "active",
            name: "Home"
        }];

        $rootScope.breadcrumbs = Breadcrumb;
        $scope.cashrequest = fireData.forNormaldata();
    }])
    .controller('loginController', ['$scope', '$rootScope', '$location', 'Auth', 'fireMembership', '$timeout',
        function ($scope, $rootScope, $location, Auth, fireMembership, $timeout) {

            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $scope.errormassega = "" + firebaseuser.email + " welcome back.. wait to be redirected";
                    $scope.inputs = true;
                    $scope.loginhide = true;
                    $rootScope.firebaseUser = firebaseuser;

                    $rootScope.valueroles = fireMembership.giveRoles(firebaseuser.uid);

                    $timeout(function () {
                        if ($rootScope.valueroles.role == "manager") {
                            $rootScope.manageruser = true;
                            $location.path("/manager/home");
                        }
                        else if ($rootScope.valueroles.role == "projectmanager") {
                            $rootScope.manageruser = false;
                            $location.path("/home");

                        }
                        else if ($rootScope.valueroles.role == "developer") {
                            $rootScope.manageruser = false;
                            $location.path("/home");
                        }
                        $scope.loginhide = false;

                    }, 3000);
                }
                else {
                    $location.path("/");
                }
            });



            $scope.signIn = function (event) {
                //event.preventDefault(); 
                var username = $scope.user.email;
                var psw = $scope.user.pwd;
                $rootScope.auth = Auth;
                if (username != null && psw != null) {
                    $scope.loginhide = true;

                    $scope.prcntno = 30;

                    Auth.$signInWithEmailAndPassword(username, psw)
                        .then(function (firebaseuser) {


                            $scope.prcntno = "{'width':'70%'}";

                            $rootScope.firebaseUser = firebaseuser;

                            $scope.statusupdate = "Authenticated wait to redirect you";

                            $scope.prcntno = "{'width':'80%'}";

                            $rootScope.valueroles = fireMembership.giveRoles(firebaseuser.uid);

                            $scope.inputs = true;

                            $scope.prcntno = "{'width':'90%'}";

                            $timeout(function () {
                                $scope.prcntno = "{'width':'100%'}";

                                if ($rootScope.valueroles.role == "manager") {
                                    $rootScope.manageruser = true;
                                    $location.path("/manager/home");
                                }
                                else if ($rootScope.valueroles.role == "projectmanager") {
                                    $location.path("/home");

                                }
                                else if ($rootScope.valueroles.role == "developer") {
                                    $location.path("/home");
                                }
                                $scope.loginhide = false;
                                $scope.inputs = false;

                            }, 5000);


                        }).catch(function (error) {
                            $scope.prcntno = "{'width':'0%'}";
                            $scope.loginhide = false;
                            $scope.inputs = false;
                            var errorcode = error.code;
                            var errormassga = error.message;

                            $scope.errormassega = errormassga;
                            $scope.user.email = '';
                            $scope.user.pwd = '';
                        })
                }
            }

            $rootScope.signOut = function () {
                Auth.$signOut();
                $rootScope.firebaseUser = '';
                $location.path("/");
            }


        }])
    .controller('accountController', ['$scope', '$location', 'Auth',
        function ($scope, $location, Auth) {
            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $rootScope.firebaseUser = firebaseuser;
                }
            });

            var opton = this;
            opton = { a: false, b: false, c: false };

            $scope.option = opton;
            $scope.item = _.findWhere(questdata, { id: 1 });

            var sdt = $interval(function () {
                $scope.soundss = { thing: 'something.mp3' };
            }, 3400);

            var ss;
            $scope.quetion = function () {
                $scope.soundss = { thng: '' };



                $scope.userans = [];

                var nt = {
                    id: loopnum,
                    answers: [
                        {
                            a: $scope.option.a,
                            b: $scope.option.b,
                            c: $scope.option.c
                        }
                    ]
                };

                anss.push(nt);
                var timcounter = 1;

                var tim = $interval(function () {
                    $scope.timecounter = timcounter;

                    if (timcounter > 5) {
                        $location.path('/done');
                    }
                    timcounter++;
                }, 40000);

                var yes;
                var agan, xx = {};

                var agan = _.findWhere(Qnanswers, { id: loopnum });
                var xx = _.findWhere(anss, { id: loopnum });

                yes = _.isEqual(agan, xx);
                if (yes) {
                    $scope.$apply;
                    $scope.soundss = { thng: 'clap.mp3' };
                    count++;
                    $scope.cont = count;

                }
                else {
                    $scope.soundss = { thng: 'wrong.mp3' };

                }

                if (loopnum >= 10) {


                    $scope.str = count;
                    dataservice.dataadd(count);
                    $location.path('/done');


                }
                $scope.option = { a: false, b: false, c: false };

                loopnum++;
                var nxt = _.findWhere(questdata, { id: loopnum });
                $scope.item = nxt;
                $scope.$apply;


            };


        }])
    .controller('managerController', ['$scope', '$rootScope', '$location', 'Auth', 'fireData', 'fireMembership',
        function ($scope, $rootScope, $location, Auth, fireData, fireMembership) {
            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $rootScope.firebaseUser = firebaseuser;
                    if ($rootScope.valueroles == undefined) {
                        $rootScope.valueroles = fireMembership.giveRoles(firebaseuser.uid);

                        $timeout(function () {
                            if ($rootScope.valueroles.role == "manager") {
                                $rootScope.manageruser = true;

                            }
                            else if ($rootScope.valueroles.role == "projectmanager") {
                                $rootScope.manageruser = false;


                            }
                            else if ($rootScope.valueroles.role == "developer") {
                                $rootScope.manageruser = false;

                            }


                        }, 2000);
                    }
                }
                else {
                    $location.path("/");
                }
            });
            $rootScope.signOut = function () {
                Auth.$signOut();
                $rootScope.firebaseUser = false;
                $location.path("/");
            }
            var Breadcrumb = [];
            Breadcrumb = [{
                link: "",
                style: "",
                name: "Manager"
            },
            {
                link: "/manager/home",
                style: "",
                name: "Home"
            }];

            $rootScope.breadcrumbs = Breadcrumb;
            $scope.cashrequest = fireData.managerdata();
            //var strinid = _.values(striid);
            $scope.approve = function (cr, userid) {

                fireData.changestatus(cr, userid);
                $scope.cashrequest = fireData.managerdata();
            };
            $scope.no = function (cr, userid) {
                fireData.changestatusno(cr, userid);
                $scope.cashrequest = fireData.managerdata();
            };


        }])
    .controller('projectController', ['$scope', '$location', '$rootScope', 'Auth', 'fireData', 'fireParticular', 'fireMembership',
        function ($scope, $location, $rootScope, Auth, fireData, fireParticular, fireMembership) {
            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $rootScope.firebaseUser = firebaseuser;
                    if ($rootScope.valueroles == undefined) {
                        $rootScope.valueroles = fireMembership.giveRoles(firebaseuser.uid);

                        $timeout(function () {
                            if ($rootScope.valueroles.role == "manager") {
                                $rootScope.manageruser = true;

                            }
                            else if ($rootScope.valueroles.role == "projectmanager") {
                                $rootScope.manageruser = false;


                            }
                            else if ($rootScope.valueroles.role == "developer") {
                                $rootScope.manageruser = false;

                            }


                        }, 2000);
                    }
                }
                else {
                    $location.path("/");
                }
            });
            $rootScope.signOut = function () {
                Auth.$signOut();
                $rootScope.firebaseUser = false;
                $location.path("/");
            }
            var Breadcrumb = [];
            Breadcrumb = [{
                link: "/manager/home",
                style: "",
                name: "Manager"
            },
            {
                link: "/manager/projects",
                style: "",
                name: "Projects"
            }];

            $rootScope.breadcrumbs = Breadcrumb;
            $scope.cashrequest = fireData.managerdata();


            $scope.viewParticulars = function (id) {

                $scope.particularlist = fireParticular.writeNewParticular(id);
            };



        }])
    .controller('CRController', ['$scope', '$rootScope', 'fireData', '$location', 'Auth', 'fireMembership',
        function ($scope, $rootScope, fireData, $location, Auth, fireMembership) {
            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $rootScope.firebaseUser = firebaseuser;
                    if ($rootScope.valueroles == undefined) {
                        $rootScope.valueroles = fireMembership.giveRoles(firebaseuser.uid);

                        $timeout(function () {
                            if ($rootScope.valueroles.role == "manager") {
                                $rootScope.manageruser = true;

                            }
                            else if ($rootScope.valueroles.role == "projectmanager") {
                                $rootScope.manageruser = false;


                            }
                            else if ($rootScope.valueroles.role == "developer") {
                                $rootScope.manageruser = false;

                            }


                        }, 2000);
                    }
                }
                else {
                    $location.path("/");
                }
            });
            $rootScope.signOut = function () {
                Auth.$signOut();
                $rootScope.firebaseUser = false;
                $location.path("/");
            }
            var Breadcrumb = [];
            Breadcrumb = [{
                link: "/home",
                style: "",
                name: "Home"
            },
            {
                link: "/cashrequest",
                style: "active",
                name: "Cash Request"
            }];

            $rootScope.breadcrumbs = Breadcrumb;
            $scope.cashrequest = fireData.forNormaldata();

            $scope.addCashRequest = function (cs) {

                var entrtyone = {
                    name: cs.name,
                    tittle: cs.tittle,
                    purpose: cs.purpose,
                    date: cs.date.getTime(),
                    by: $rootScope.firebaseUser.email,
                    budget: cs.budget,
                    status: "pending",
                    progress: "new"
                },
                    entrtytwo = {
                        name: cs.name,
                        tittle: cs.tittle,
                        purpose: cs.purpose,
                        date: cs.date.getTime(),
                        by: $rootScope.firebaseUser.email,
                        userid: $rootScope.firebaseUser.uid,
                        budget: cs.budget,
                        status: "pending",
                        progress: "new",
                        datasubmited: firebase.database.ServerValue.TIMESTAMP
                    };

                // Get a key for a new Post.
                var newPostKey = firebase.database().ref().child('cashRequest').push().key;

                // Write the new post's data simultaneously in the posts list and the user's post list.
                var updates = {};
                updates['/cashRequestManager/' + newPostKey] = entrtytwo;
                updates['/cashRequest/' + $rootScope.firebaseUser.uid + '/' + newPostKey] = entrtyone;

                $scope.CS.name = '';
                $scope.CS.tittle = '';
                $scope.CS.purpose = '';
                $scope.CS.budget = '';
                $scope.CS.date = '';

                return firebase.database().ref().update(updates);



            }

        }])
    .controller('particularsController', ['$scope', '$rootScope', '$routeParams', '$location', 'Auth', 'fireParticular', 'fireMembership',
        function ($scope, $rootScope, $routeParams, $location, Auth, fireParticular, fireMembership) {
            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $rootScope.firebaseUser = firebaseuser;
                    if ($rootScope.valueroles == undefined) {
                        $rootScope.valueroles = fireMembership.giveRoles(firebaseuser.uid);

                        $timeout(function () {
                            if ($rootScope.valueroles.role == "manager") {
                                $rootScope.manageruser = true;

                            }
                            else if ($rootScope.valueroles.role == "projectmanager") {
                                $rootScope.manageruser = false;


                            }
                            else if ($rootScope.valueroles.role == "developer") {
                                $rootScope.manageruser = false;

                            }


                        }, 2000);
                    }
                }
                else {
                    $location.path("#/");
                }
            });
            $rootScope.signOut = function () {
                Auth.$signOut();
                $rootScope.firebaseUser = false;
                $location.path("/");
            }
            var id = $routeParams.id;
            var Breadcrumb = [];
            Breadcrumb = [{
                link: "#/home",
                style: "",
                name: "Home"
            },
            {
                link: "#/cashrequest",
                style: "",
                name: "Purchase Order"
            },
            {
                link: "#/addparticulars",
                style: "active",
                name: "particulars"
            }];

            $rootScope.breadcrumbs = Breadcrumb;
            $scope.cr = fireParticular.getrecord(id);
            $scope.particularlist = fireParticular.writeNewParticular(id);

            $scope.addParticulars = function (particular) {
                var newkey = firebase.database().ref().child("particular").push();

                var storageref = firebase.storage().ref("invoice");

                var imageref = storageref.child(newkey.key);

                 var entry = {
                     name: particular.name,
                     quanity: particular.quanity,
                     unitcost: particular.cost,
                     amount: particular.amount,
                     date: particular.date.getTime(),
                     by: $rootScope.firebaseUser.email,
                     datasubmited: firebase.database.ServerValue.TIMESTAMP
 
                 };
                var fileto = document.getElementById("fileupload");
                var metadata = {
                    contentType: 'image/jpeg',
                };

                var actualfile = fileto.files[0];

                var uploadtask = imageref.put(actualfile, metadata);

                uploadtask.on(firebase.storage.TaskEvent.STATE_CHANGED, function progress(snapshot) {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(progress);
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                })


                var particulupdate = {};
                particulupdate['/particular/' + newkey] = entry;

                return firebase.database().ref().update(particulupdate);
               

            }
        }])
    .controller('NoController', ['$scope', '$rootScope', 'fireData', '$location', 'Auth', 'fireMembership',
        function ($scope, $rootScope, fireData, $location, Auth, fireMembership) {
            Auth.$onAuthStateChanged(function (firebaseuser) {
                if (firebaseuser) {
                    $rootScope.firebaseUser = firebaseuser;

                }
                else {
                    $location.path("/");
                }
            });
            $rootScope.signOut = function () {
                Auth.$signOut();
                $rootScope.firebaseUser = false;
                $location.path("/");
            }
            var Breadcrumb = [];
            Breadcrumb = [
                {
                    link: "#/home",
                    style: "",
                    name: "Home"
                },
                {
                    link: "#/cashrequest",
                    style: "active",
                    name: "Purchase Order"
                }, {
                    link: "",
                    style: "",
                    name: "Status"
                },
                {
                    link: "",
                    style: "",
                    name: "Not Approved"
                },
                {
                    link: "",
                    style: "active",
                    name: "Edit"
                }
            ];
            $scope.savebuttun = false;
            $rootScope.breadcrumbs = Breadcrumb;
            $scope.cashrequest = fireData.forNormaldata();
            $scope.CS = {};

            $scope.editpurchase = function (cr) {
                $scope.CS = cr;
                $scope.savebuttun = true;
            }

            $scope.savechanges = function (cs) {

                var entrtyone = {
                    name: cs.name,
                    tittle: cs.tittle,
                    purpose: cs.purpose,
                    date: cs.date.getTime(),
                    by: $rootScope.firebaseUser.email,
                    budget: cs.budget,
                    status: "pending",
                    progress: "new"
                },
                    entrtytwo = {
                        name: cs.name,
                        tittle: cs.tittle,
                        purpose: cs.purpose,
                        date: cs.date.getTime(),
                        by: $rootScope.firebaseUser.email,
                        userid: $rootScope.firebaseUser.uid,
                        budget: cs.budget,
                        status: "pending",
                        progress: "new",
                        datasubmited: firebase.database.ServerValue.TIMESTAMP
                    };
                fireData.editpurchase(cs.$id, cs.userid, entrtyone, entrtytwo);

            }
        }])
    .filter('statuspending', function () {
        return function (items, letter) {
            var filtered = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (/pending/i.test(item.status.substring(0, 7))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    }).filter('statusapprove', function () {
        return function (items, letter) {
            var filtered = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (/approved/i.test(item.status.substring(0, 8))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    }).filter('statusnot', function () {
        return function (items, letter) {
            var filtered = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (/no/i.test(item.status.substring(0, 2))) {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    });