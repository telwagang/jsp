var app = angular.module("JspApp", ['ngRoute']);



app.config(['$routeProvider', function($routeProvider, $routeParams) {
    $routeProvider
        .when('/',
        {
            templateUrl: "partials/start.html",
            controller: 'MainController'
        })
        .when('/pre',
        {
            templateUrl: "partials/chosen.html",
            controller: 'ChosenController'
        })
        .when('/quiz',
        {
            templateUrl: "partials/questions.html",
            controller: 'questionController'
        })
        .when('/done',
        {
            title: "Poles",
            templateUrl: "partials/final.html",
            controller: 'finalController'
        })
        .otherwise({
            templateUrl: "partials/error.html"
        });
  
     // $locationProvider.html5Mode(true);
}]);

app.factory('dataservice' , function(){
          var datas =[];
         
           
           
           dataadd = function(num){
               datas.push(num);
           }
           
           dataget = function(num){
               return datas;
           }
           return{ dataadd: dataadd,
                  dataget: dataget};
});
app.controller('MainController', ['$scope', '$http',
    function($scope, $http) {

    }])
    .controller('ChosenController', ['$scope', '$http','$location','dataservice',
    function($scope, $http, $location,dataservice ) {
      
      var cartg = [{cssr:'gold',name:'Gold Box'},
                  {cssr:'black',name:'Black Box'},
                  {cssr:'white' ,name:'White Box'}];
      
      $scope.cart = cartg;
      var num = [];
      $scope.boxes = function(numb) {
         
         if(numb =1 ){
         num = {
            id:1, numbr:1};
         
          $location.path('/quiz');
          
         }
      
         if(numb = 2){
         num = {
             numbr: 2
         };  
        // $scope.one = num;
        //  $scope.one = dataservice;
          $location.path('/quiz');        
         }
      
     if(numb = 3){
           num = {
             numbr: 3
         };
        // $scope.one = num;
       //  $scope.one = dataservice;
          $location.path('/quiz');
     }
     if(numb >3)
     {
         alert('check again');
     }
      };
      
      
      
    }])
    .controller('questionController', ['$scope', '$http', '$location','$interval','$timeout','dataservice',
        function($scope, $http,$location,$interval, $timeout,dataservice) {
           //  var striid = this; 
           //  striid.dataservice = dataservice.list;
            //  var srinid = _.pick(striid,'numbr');
            //  var strinid = _.values(srinid);
             
            var questdata = [];
             var Qnanswers = [];
             var loopnum = 1;
            var count = 0 ; 
            var anss = [];
            var timer;
            var strinid = _.random(1,5);
            
            switch(strinid){
                case 1:
                 questdata = [
                    {
                        "id": 1,
                        "Did":false,
                        "Question":"1. Mchezaji Bora wa Africa wa ligi za ndani 2015" ,
                        "a": "Samatta",
                        "b": "Kaseke",
                        "c": "Nyoni"
                    },
                    {
                        "id": 2,
                        "Did":false,
                        "Question": "2. Kocha wa timu ya Serengeti Boys anaitwa? ",
                        "a": "Marcio Maximo",
                        "b": "Bakari Shime",
                        "c": "kim Poulsen"
                    },
                    {
                        "id": 3,
                        "Did":false,
                        "Question": "3. Serengeti Premium Lager ilithibitishwa na TBS mwaka gani?	",
                        "a": 1982,
                        "b": 1922,
                        "C": 1992
                    },
                    {
                        "id": 4,
                        "Did":false,
                        "Question": "4.	Bia ya Serengeti Premium Lager ina kilevi asilimia ngapi?",
                        "a": "4.8%",
                        "b": "4.2%",
                        "c": "4.08%"
                    },
                    {
                        "id": 5,
                        "Did":false,
                        "Question": "5. Mwanadada Wema Sepetu ameigiza fila,mu gani?",
                        "a": "Too Much",
                        "b": "Tarzan",
                        "c": "Madame"
                    },
                    {
                        "id": 6,
                        "Did":false,
                        "Question": "6. Lulu Michael ameigiza filamu gani",
                        "a": "Mapenzi ya Mungu",
                        "b": "Too Much",
                        "c": "keeping with the three sisters"
                    },
                    {
                        "id": 7,
                        "Did":false,
                        "Question": "7. Bia ya Serengeti Premium Lager inpatikana katika ujazo wa mls ngapi?",
                        "a": "330ml",
                        "b": "500ml",
                        "c": "375ml"
                    },
                    {
                        "id": 8,
                        "Did":false,
                        "Question": "8.	Mnyama gani anawakilisha beer ya Serengeti Premium Lager?",
                        "a": "Chui",
                        "b": "Duma",
                        "c": "Chita"
                    },
                    {
                        "id": 9,
                        "Did":false,
                        "Question": "9. makamu wa raisi wa awamu ya tano?",
                        "a": "Omar Ali Juma",
                        "b": "Samia Seleke",
                        "c": "Samia Suhulu"
                    },
                    {
                        "id": 10,
                        "Did":false,
                        "Question": "10. Mh.Joseph  Warioba alikua  waziri mkuu wa Tanzania mwaka?",
                        "a": 1982,
                        "b": 2006,
                        "c": 1985
                    }
                    
                ];
                 Qnanswers = [
                        {
                            id: 1,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 3,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 4,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 5,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 6,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 7,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 8,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 9,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 10,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        }
                    ];
    
                break;
                case 2:
                questdata = [
                        {
                            "id": 1,
                            "Did":false,
                            "Question":"1.	Bia ya Serengeti Premium Lager inapatikana kwenye ujazo wa aina ngapi?" ,
                            "a": "3",
                            "b": "2",
                            "c": "1"
                        },
                        {
                            "id": 2,
                            "Did":false,
                            "Question": "2.	Taja mikoa 3 inayozalisha beer ya Serengeti Premium Lager",
                            "a": "Mwanza, Manyara, Moshi",
                            "b": "Moshi, Mwanza, Dar es salaam",
                            "c": "Dar es salaam, Mwanza, Kilimanjaro"
                        },
                        {
                            "id": 3,
                            "Did":false,
                            "Question": "3. Maximo kabla ya kutimuliwa kutoka Timu ya Taifa alikua kocha wa Timu gani?",
                            "a": "Livingston",
                            "b": "Liverpool",
                            "C": "Real"
                        },
                        {
                            "id": 4,
                            "Did":false,
                            "Question": "4.Nahodha (kapteni) wa Taifa Stars 2016",
                            "a": "Kaseke",
                            "b": "Nyoni",
                            "c": "Samatta"
                        },
                        {
                            "id": 5,
                            "Did":false,
                            "Question": "5.Filamu ya kitanzania kushinda best short film katika shindano  Amaa  Awards ni? ",
                            "a": "The Young Smoker",
                            "b": "Chumo",
                            "c": "Look Again"
                        },
                        {
                            "id": 6,
                            "Did":false,
                            "Question": "6.	Neno Serengeti limejirudia mara ngapi kwenye chupa ya bia ya Serengeti Premium Lager",
                            "a": "Tano",
                            "b": "Moja",
                            "c": "Nane"
                        },
                        {
                            "id": 7,
                            "Did":false,
                            "Question": "7. Raisi wa awamu ya tano alisoma wapi ?",
                            "a": "Ushindi Primary School",
                            "b": "Mbuyuni Primary School",
                            "c": "Chato Primary School"
                        },
                        {
                            "id": 8,
                            "Did":false,
                            "Question": "8.	Kuna rangi ngapi kwenye bia ya Serengeti Premium Lager",
                            "a": "Nane",
                            "b": "Tatu",
                            "c": "Mbili"
                        },
                        {
                            "id": 9,
                            "Did":false,
                            "Question": "9. Diamond Platnum anamiaka mingapi ?",
                            "a": "25",
                            "b": "26",
                            "c": "27"
                        },
                        {
                            "id": 10,
                            "Did":false,
                            "Question": "10.	Rangi nyeusi katika chupa ya bia ya Serengeti Premium Lager inawakilisha nini",
                            "a": "Uafrika wetu",
                            "b": "uweusi wa bia",
                            "c": "Rangi ya bia"
                        }
                        
                    ];
                Qnanswers = [
                        {
                            id: 1,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 3,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 4,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 5,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 6,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 7,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 8,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 9,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 10,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        }
                    ];
                break ;
                case 3:
                 questdata = [
                        {
                            "id": 1,
                            "Did":false,
                            "Question":"1.	Rangi ya dhahabu katika chupa ya bia ya Serengeti Premium Lager inawakilisha nini" ,
                            "a": "Mbwembwe",
                            "b": "Madini yapatikanayo katika nchi",
                            "c": "Machewo"
                        },
                        {
                            "id": 2,
                            "Did":false,
                            "Question": "2.	Rangi nyeupe katika chupa ya bia ya Serengeti Premium Lager inawakilisha nini",
                            "a": "Amani na Upendo",
                            "b": "Chokaa",
                            "c": "Watali katika Mbuga ya Serengeti"
                        },
                        {
                            "id": 3,
                            "Did":false,
                            "Question": "3. Landcruiser  V8 lina  cylinder ngapi?",
                            "a": 8,
                            "b": 7,
                            "C": "hakuna majibu kati ya hayo"
                        },
                        {
                            "id": 4,
                            "Did":false,
                            "Question": "4. Gari lenye mbio kuliko yote duniani",
                            "a": "Bugatti",
                            "b": "Lamborgini",
                            "c": "koenigsegg"
                        },
                        {
                            "id": 5,
                            "Did":false,
                            "Question": "5. Bia ya Serengeti Premium Lager inazalishwa katika mikoa mingapi ",
                            "a": "3",
                            "b": "2",
                            "c": "1"
                        },
                        {
                            "id": 6,
                            "Did":false,
                            "Question": "Lady Jay Dee ana nyimbo gani mpya ",
                            "a": "NdiNdiNdi",
                            "b": "Furaha",
                            "c": "Machozi"
                        },
                        {
                            "id": 7,
                            "Did":false,
                            "Question": "7.Speaker wa Bunge la 11 Tanzania 2016 ni?",
                            "a": "Anna Makinda",
                            "b": "Job Ndugai",
                            "c": "Samuel Sitta"
                        },
                        {
                            "id": 8,
                            "Did":false,
                            "Question": "8. Taja sifa za wanywaji wa beer ya Serengeti Premium Lager",
                            "a": "Wawajibikaji",
                            "b": "wavivu",
                            "c": "weupe"
                        },
                        {
                            "id": 9,
                            "Did":false,
                            "Question": "9. Nini kirefu cha SPL",
                            "a": "Serengeti breweries limited",
                            "b": "Serengeti platinum lager",
                            "c": "Serengeti Premium Lager"
                        },
                        {
                            "id": 10,
                            "Did":false,
                            "Question": "Joh Makini Nyimbo yake ya don’t bother ameshirikisha nani?",
                            "a": "Vanessa",
                            "b": "Juma Nature",
                            "c": "Aka"
                        }
                        
                    ];
                 Qnanswers = [
                        {
                            id: 1,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 3,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 4,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 5,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 6,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 7,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 8,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 9,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 10,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        }
                    ];
                break;
                case 4:
                questdata = [
                    {
                            "id": 1,
                            "Did":false,
                            "Question":"1. Bia ya Serengeti  inapatika katika ujazo waina mbil ,je ni zipi kati ya hizi?",
                            "a": "330ml  na 550ml",
                            "b": "500ml na 330ml",
                            "c": "420ml na 350ml"
                        },
                        {
                            "id": 2,
                            "Did":false,
                            "Question": "2. Daraja jipya la kigamboni limepewa  jina gani?",
                            "a": "Daraja la Kigamboni Bridge of Tanzania",
                            "b": "Daraja la Wanachi Bridge",
                            "c": "Daraja la Mwalimu Nyerere"
                        },
                        {
                            "id": 3,
                            "Did":false,
                            "Question": "3. Bia  ya Serengeti  inaujazo wa kimea asilimia ngapi ?",
                            "a": "80%",
                            "b": "100%",
                            "C": "40%"
                        },
                        {
                            "id": 4,
                            "Did":false,
                            "Question": "4.	Tanzania ina jumla ya mikoa mingapi?",
                            "a": "39",
                            "b": "30",
                            "c": "26"
                        },
                        {
                            "id": 5,
                            "Did":false,
                            "Question": "5. Bia ya  Serengeti   inaedana",
                            "a": "Sambusa",
                            "b": "Wali",
                            "c": "Nyama Choma"
                        },
                        {
                            "id": 6,
                            "Did":false,
                            "Question": "6. Jumuiya ya umoja wa Afrika  mashariki ina jumiya ya nchi ngapi?",
                            "a": "3",
                            "b": "5",
                            "c": "6"
                        },
                        {
                            "id": 7,
                            "Did":false,
                            "Question": "7.Bia ya Serengeti ni bia ya pekee yakitanzania yenye asilia 100% ya ?",
                            "a": "Ngano",
                            "b": "Kimea",
                            "c": "Sukari"
                        },
                        {
                            "id": 8,
                            "Did":false,
                            "Question": "8. Upi ni mtiriko sahihi kati ya hisi ?",
                            "a": "Rais, Bunge la Taifa, Makamu Rais",
                            "b": "Rais, Waziri Mkuu, Makamu Rais",
                            "c": "Rais, makamu Rais, Waziri Mkuu"
                        },
                        {
                            "id": 9,
                            "Did":false,
                            "Question": "9. Bia ya Serengeti ya ujazo 500ml inauzwa  kwa bei ya?",
                            "a": "Tshs.2000/=",
                            "b": "Tshs. 3000/=",
                            "c": "Tshs.  2300/="
                        },
                        {
                            "id": 10,
                            "Did":false,
                            "Question": "Joh Makini Nyimbo yake ya don’t bother ameshirikisha nani?",
                            "a": "Vanessa",
                            "b": "Juma Nature",
                            "c": "Aka"
                        }];
                Qnanswers = [ 
                        {
                            id: 1,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 3,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 4,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 5,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 6,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 7,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 8,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 9,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 10,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        }
                    ];
                break; 
                case 5:
                 questdata = [
                     {
                            "id": 1,
                            "Did":false,
                            "Question":"1. Serengeti Premium lager inatakiwa kuifadhiwa  katika mazingira  gani ?" ,
                            "a": "Sehemu  yenye giza , kavu safi na yenye ubaridi",
                            "b": "sehemu yenye mwanga, na nyevu nyevu na uvuguvugu",
                            "c": "Sehemu yenye mwanga kidogo na  safi na yenye ubaridi"
                        },
                        {
                            "id": 2,
                            "Did":false,
                            "Question": "2. Neno SERENGETI lina herufi ngapi ?",
                            "a": "8",
                            "b": "9",
                            "c": "10"
                        },
                        {
                            "id": 3,
                            "Did":false,
                            "Question": "3. Serengeti  premium lager inapendeza ikiwa na ubaridi wa joto nyuzi ngapi?",
                            "a": "3",
                            "b": "4",
                            "C": "7"
                        },
                        {
                            "id": 4,
                            "Did":false,
                            "Question": "4.	Mwanamuziki Prof. Jay ni mbunye wa jimbo la.... ?",
                            "a": "Kinondoni",
                            "b": "Kibaha",
                            "c": "Mikumi"
                        },
                        {
                            "id": 5,
                            "Did":false,
                            "Question": "5. Je Serengeti Premium Lager yenye ujazo 330ml, na 500ml zinautofauti  wowote kwenye ladha?",
                            "a": "Hapana",
                            "b": "Ndio",
                            "c": "Sijui"
                        },
                        {
                            "id": 6,
                            "Did":false,
                            "Question": "6. Kiswahili cha neno Hangover  ni nini ?",
                            "a": "Mkatikio",
                            "b": "Mning'inio",
                            "c": "mtundikio"
                        },
                        {
                            "id": 7,
                            "Did":false,
                            "Question": "7. Bia ya Serengeti Premium Lager(SPL) imeshinda Gold mond Awads kwa Mara Ngapi ?",
                            "a": "4",
                            "b": "6",
                            "c": "3"
                        },
                        {
                            "id": 8,
                            "Did":false,
                            "Question": "8. Upi ni mtiriko sahihi kati ya hisi ?",
                            "a": "Rais, Bunge la Taifa, Makamu Rais",
                            "b": "Rais, Waziri Mkuu, Makamu Rais",
                            "c": "Rais, makamu Rais, Waziri Mkuu"
                        },
                        {
                            "id": 9,
                            "Did":false,
                            "Question": "9. Bia ya Serengeti ya ujazo 500ml inauzwa  kwa bei ya?",
                            "a": "Tshs.2000/=",
                            "b": "Tshs. 3000/=",
                            "c": "Tshs.  2300/="
                        },
                        {
                            "id": 10,
                            "Did":false,
                            "Question": "Joh Makini Nyimbo yake ya don’t bother ameshirikisha nani?",
                            "a": "Vanessa",
                            "b": "Juma Nature",
                            "c": "Aka"
                        }];
                Qnanswers = [{
                            id: 1,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 2,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 3,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 4,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 5,
                            answers: [
                                {
                                    a: true,
                                    b: false,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 6,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 7,
                            answers: [
                                {
                                    a: false,
                                    b: true,
                                    c: false
                                }
                            ]
                        },
                        {
                            id: 8,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 9,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        },
                        {
                            id: 10,
                            answers: [
                                {
                                    a: false,
                                    b: false,
                                    c: true
                                }
                            ]
                        }
                    ];
                break;
                default:
                 alert('this value :'+strinid);
            }
         
            var opton = this;
            opton = { a: false, b: false, c: false };

            $scope.option = opton;
             $scope.item = _.findWhere(questdata, { id: 1 });
           
           var sdt =  $interval(function () {
               $scope.soundss = {thing: 'something.mp3'};
           },3400);
            
            var ss;
            $scope.quetion = function() 
            {
                 $scope.soundss= {thng: ''};
                   
                
                  
                  $scope.userans = [];
                 
                 var nt = {id:loopnum,
                      answers:[
                           {
                               a:$scope.option.a,
                               b:$scope.option.b,
                               c:$scope.option.c
                           }
                   ]};
                   
                    anss.push(nt);
                    var timcounter = 1;
                    
                      var tim = $interval(function ()
                      {
                          $scope.timecounter = timcounter;

                          if(timcounter>5)
                          {
                              $location.path('/done');
                          }
                          timcounter++;
                      },40000);
                      
                   var yes;
                   var agan,xx = {};
                      
                   var agan = _.findWhere(Qnanswers, {id:loopnum });
                   var xx = _.findWhere(anss, {id:loopnum});
                  
                     yes = _.isEqual(agan, xx);
                      if(yes)
                      {
                          $scope.$apply;
                          $scope.soundss = {thng:'clap.mp3'};
                            count++;
                              $scope.cont = count;
                             
                      }
                      else{
                          $scope.soundss = {thng:'wrong.mp3'};
                          
                      }
                      
                      if (loopnum >= 10) 
                     {
                         
                       
                         $scope.str = count;
                         dataservice.dataadd(count);
                           $location.path('/done');
                   
                       
                       }
                   $scope.option = { a: false, b: false, c: false };
                 
                loopnum++;
                var nxt = _.findWhere(questdata, {id:loopnum});
                $scope.item = nxt;
                $scope.$apply;
                
            
            };

          
        }])
    .controller('finalController', ['$scope','$http','$timeout','dataservice',
    function($scope, $http,$timeout, dataservice) {
              $scope.hide = 'dnt' ;
              $scope.show = '';
                var striid = this; 
               striid = dataservice.dataget();
               
                var strinid = _.values(striid);
 
             var timer =   $timeout(function() {
                   $scope.show = 'dnt';
                   $scope.hide = '';
                //  var lineup = _.values(dataservice);
                 var lineup = strinid;
               
               if(lineup >= 5)
               {
                   $scope.textone = 'Hongera kwa Kushinda Chui Quiz Master';
                   $scope.texttwo = 'Umefanikiwa kushinda Zawadi Ya Chui na Serengeti';
                   $scope.soundss ='celebra.MP3';
               }
               if(lineup < 5 )
               {
                   $scope.textone = 'Ashante kwa Kujaribu';
                   $scope.texttwo = 'Jaribu tena';
                   $scope.soundss = 'lozzz.mp3';
                   
               } 
               },4000,true);
               
               
                
   }]);
  
