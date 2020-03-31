

async function submitLoanData(){
    $("#ResultCreditTrue").hide();
    $("#ResultCreditFalse").hide();
    $("#progressbar").hide();
    aliceAccountHash = "tz1Vqp9r62vrCiW5GhDwHJroMunVKymuzjGZ";
    LoanManagement5 = "KT1XAcVsT1iNWMT8NeePhn59kqQwU7xUQCzq";
    eztz.node.setProvider("https://api.tez.ie/rpc/babylonnet");
    var id;
    eztz.contract.storage(LoanManagement5).then(function(res){
    const obj = res.args[[0]];

    const sec = obj[obj.length-1];

    const arr = sec.args[0].int.replace(/[\[\]"]+/g,"");
    const previd = parseInt(arr);
    id = previd +1;
    }).catch(function(e){});
 
    $("button").click(function(){ 

       // var ageVal = $("#ageInput").val();
        if($("#ageInput").val()==""||$("#childrenInput").val()==""|| $("#fullNameInput").val()==""||
        $("#loanValueInput").val()==""||  $("#locationInput").val()==""|| $("#nationalityInput").val()==""||
        $("#propertyValueInput").val()==""||  $("#salaryInput").val()==""){
            alert("Please fill in all the input fields!!");
        }
        else if (isNaN($("#ageInput").val())) {
            alert("Please give Proper input");
            $("#ageErr").html("Age should be numerics");
        }
        else if (isNaN($("#childrenInput").val())) {
            alert("Please give Proper input");
            $("#childErr").html("Number of children should be numerics");
        }
        else if (isNaN($("#loanValueInput").val())) {
            alert("Please give Proper input");
            $("#loanErr").html("Loan amount should be in numerics");
        }
        else if (isNaN($("#propertyValueInput").val())) {
            alert("Please give Proper input");
            $("#propertyErr").html("property value should in numerics");
        }
        else if (isNaN($("#salaryInput").val())) {
            alert("Please give Proper input");
            $("#salaryErr").html("Salary should be in numerics");
        }
        else{
            loadData(id, $("#ageInput").val(),$("#childrenInput").val(), $("#fullNameInput").val(),
            $("#loanValueInput").val(),  $("#locationInput").val(),  $("input[type='radio'][name='status']:checked").val(), $("#nationalityInput").val(),
            $("#propertyValueInput").val(),  $("#salaryInput").val());
            document.getElementById('loanForm').reset();
        }
    });
    }



async function loadData(id, age, children, fullname,loanValue, location, marriageStatus, nationality,propertyValue,salary) {
  contractAddress = "KT1XAcVsT1iNWMT8NeePhn59kqQwU7xUQCzq";
  eztz.node.setProvider("https://api.tez.ie/rpc/babylonnet");
  aliceAccountHash = "tz1Vqp9r62vrCiW5GhDwHJroMunVKymuzjGZ";
    keys = eztz.crypto.extractKeys("edsk4Gpxmc1DRNg5buZ7FyeFvKYce5SKWarqBsqqfShzLEaggcad3L");
    const param='(Pair (Pair (Pair (Pair (Pair (Pair (Pair (Pair (Pair '+ id + ' ' + age +') ' + children + ') "'+ fullname +'") '+loanValue+') "'+ location +'") '+ marriageStatus +') "'+ nationality +'") '+ propertyValue +') '+ salary +')'

    await eztz.contract.send(contractAddress, aliceAccountHash, keys, 0, param, "0900000", 700000, 60000).then(function(res){
        console.log(res);
        $("#formloan").hide();
       // alert("Your Application for Check credit score eligibility is submitted!! Your result will be displayed in 3 minutes");
        $("#progressbar").show();
    });

    $( function() {
        $("#progressbar").show();
        var progressbar = $( "#progressbar" ),
          progressLabel = $( ".progress-label" );
     
        progressbar.progressbar({
          value: false,
          change: function() {
            progressLabel.text( progressbar.progressbar( "value" ) + "%" );
          },
          complete: function() {
            $(".progress-label").hide();
            $(".progress-label-head").hide();
            $("#progessbar").hide();
            eztz.contract.storage(contractAddress).then(function(res1){
                const obj1 = res1.args[[0]];
                const sec1 = obj1[obj1.length-1];
                const arr1 = sec1.args[0].int.replace(/[\[\]"]+/g,"");
                const id1 = parseInt(arr1);
                //console.log(id1);
                //$("#contractId").html(id1);
                const brr1 = sec1.args[1];
                //console.log(brr1);
                const eligAmount = brr1.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
                //console.log(eligAmount);
                //$("#eligibleLoanAmount").html(eligAmount);
                const elig = brr1.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].prim.replace(/[\[\]"]+/g,"");
                //console.log(elig);
                //$("#eligibility").html(elig);
                const creditScore = brr1.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
                if(elig.toString()=="True"){
                    $("#ResultCreditTrue").show();
                    $("#creditScoreTrue").html(creditScore);
                    $("#eligibleLoanAmount").html(eligAmount);
                    $("#contractId").html(id1);
                }
                else{
                    $("#ResultCreditFalse").show();
                    $("#creditScoreFalse").html(creditScore);
                }
            }).catch(function(e){});
          }
        });
     
        function progress() {
          var val = progressbar.progressbar( "value" ) || 0;
     
          progressbar.progressbar( "value", val + 1 );
     
          if ( val < 99 ) {
            setTimeout( progress, 1700 );
          }
        }
     
        setTimeout( progress, 10000 );
      } );
}

$(document).ready(submitLoanData);









// /*function initui(){
// $('#check').click(() => Check($('#idInput').val()));
// }*/
// keys = eztz.crypto.extractKeys("edsk4Gpxmc1DRNg5buZ7FyeFvKYce5SKWarqBsqqfShzLEaggcad3L");
// console.log(keys);

// $(document).ready(function(){
//     var myfunction=function(){
//         aliceAccountHash = "tz1Vqp9r62vrCiW5GhDwHJroMunVKymuzjGZ";
//         bobAccountHash = "tz1T9WzKkYfMANQbsdb9VYQTVTreyZ4nY2YK";
//         nameSurnameStoring = "KT1JXjgD7JMQurrMsfsXas2DrWsLYwWehg16";
//         LoanManagement3 = "KT18c4LJsycfrWLkBawLMScXMHizNjgy5VXE";


//         eztz.node.setProvider("https://api.tez.ie/rpc/babylonnet");
// /*function initui(){
// $('#check').click(() => Check($('#idInput').val()));
// }*/
//         keys = eztz.crypto.extractKeys("edsk4Gpxmc1DRNg5buZ7FyeFvKYce5SKWarqBsqqfShzLEaggcad3L");
//         return eztz.contract.send("KT1Ve3wAKYRRAp986HyFm1AxcWAdop8S2GVJ", aliceAccountHash, keys, 0, '7', "0050000", 350000, 60000);
//         // .then(function(res){
//         //     console.log(res);
//         //    });
//         // alert('hey');
//     }

//     $("button").on("click",myfunction);

//     // $("#check").click(function(){
//     //     $.fn.myFunction($('#idInput').val());

//     // });

// });


// // $.fn.myFunction = function(b){ 

    
// //     var a = "'" + b + "'";
 
// //     alert('You have successfully defined the function!' + a); 
// // }


// // $(document).ready(function(){
// //     var idTake = $('#idInput').val();
// //     console.log(idTake);
// //     $('#check').click(function Check(){
// //         console.log(idTake);
// //     });
// // });


// // $(function Check(idPass){


// //     eztz.contract.send("KT1Ve3wAKYRRAp986HyFm1AxcWAdop8S2GVJ", aliceAccountHash, keys, 0, idPass, "0050000", 350000, 60000)
// //      .then(function(res){
// //      console.log(res);
// //      //document.getElementById("contractId").innerHTML=b;
// //     });

// // });

// // $(document).ready(takeInput);



// /*
// const test = $('#idInput').val());
// async function Check(){
//     keys = eztz.crypto.extractKeys("edsk4Gpxmc1DRNg5buZ7FyeFvKYce5SKWarqBsqqfShzLEaggcad3L");
//     console.log(keys);
//     const param = '(Pair (Pair (Pair (Pair (Pair (Pair (Pair (Pair (Pair 112  26) 0) "Chiganbayeva Dina") 40000) "Canary Wharf") False) "Kazakh") 20000) 35000)';
// //    await eztz.contract.send("KT1XAcVsT1iNWMT8NeePhn59kqQwU7xUQCzq", aliceAccountHash, keys, 0, param, "0050000", 350000, 60000)
// //     .then(function(res){
// //     console.log(res);
// //     });
//     const a = document.forms["myForm"]["idInput"].value;
//     document.getElementById("contractId").innerHTML=a;
//     return true
//     }



// */

// /*

// eztz.rpc.getBalance(aliceAccountHash).then(function(res){
//    // alert("Your balance is " + res) ;
//    $("#aliceBalance").html(res);
//    $("#aliceAccount").html(aliceAccountHash);
// }).catch(function(e){
//     console.log(e);
// });


// eztz.rpc.getBalance(bobAccountHash).then(function(res){
//     $("#bobBalance").html(res);
//     $("#bobAccount").html(bobAccountHash);
//  }).catch(function(e){
//      console.log(e);
//  });


 

//  eztz.rpc.getBalance(LoanManagement3).then(function(res){
//  // Raw storage JSON object for contractAddress
//     $("#contractBalance").html(res);
//   }).catch(function(e){
      
//   });



//   eztz.contract.storage(LoanManagement3).then(function(res){
//     console.log(res); // Raw storage JSON object for contractAddress
//     console.debug(JSON.stringify(res));
//     const obj = res.args[[0]];
//    // console.log(obj);
    
//     const sec = obj[0];
//     const arr = sec.args[0].int.replace(/[\[\]"]+/g,"");
//     $("#contractId").html(arr);
//     const brr = sec.args[1];
//     console.log(brr);
//     const sal = brr.args[1].int.replace(/[\[\]"]+/g,"");
//     $("#salary").html(sal);
//     console.log(sal);
//     const propVal = brr.args[0].args[1].int.replace(/[\[\]"]+/g,"");
//     $("#propertyValue").html(propVal);
//     console.log(propVal);

//     const nation = brr.args[0].args[0].args[1].string.replace(/[\[\]"]+/g,"");
//     console.log(nation);
//     $("#nationality").html(nation);

//     const mrStatus = brr.args[0].args[0].args[0].args[1].prim.replace(/[\[\]"]+/g,"");
//     const parsedmrStatus = JSON.stringify(mrStatus);
//     console.log(mrStatus);
//     if (parsedmrStatus === "false") {
//         $("#marriageStatus").html("Single");
//     }
//     else($("#marriageStatus").html("Married"));

//     const loc = brr.args[0].args[0].args[0].args[0].args[1].string.replace(/[\[\]"]+/g,"");
//     $("#location").html(loc);

//     const loanVal = brr.args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
//     $("#loanValue").html(loanVal);

//     const idCheck = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[1].prim.replace(/[\[\]"]+/g,"");
//     if ( idCheck=== "false") {
//         $("#idCheckStatus").html("Check failed");
//     }
//     else($("#idCheckStatus").html("Successfully passed check id"));

//     const fullname = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].string.replace(/[\[\]"]+/g,"");
//     $("#fullName").html(fullname);

//     const eligAmount = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
//     $("#eligibleLoanAmount").html(eligAmount);

//     const elig = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].prim.replace(/[\[\]"]+/g,"");
//     $("#eligibility").html(elig);

//     const creditScore = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
//     $("#creditScore").html(creditScore);

//     const child = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
//     $("#children").html(child);

//     const age = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[1].int.replace(/[\[\]"]+/g,"");
//     $("#age").html(age);

//     const addressCheck = brr.args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].args[0].prim.replace(/[\[\]"]+/g,"");
//     if ( addressCheck=== "false") {
//         $("#addressCheck").html("Check failed");
//     }
//     else($("#addressCheck").html("Successfully passed Address check"));

    


  

//   }).catch(function(e){});







//   eztz.contract.storage(nameSurnameStoring).then(function(res){
//     console.log(res); // Raw storage JSON object for contractAddress
//     console.debug(JSON.stringify(res));
//     const obj1 = res.args[0].string.replace(/[\[\]"]+/g,"");
//     console.log(obj1);
//     const obj2 = JSON.stringify(obj1);

//   }).catch(function(e){});

  
// */




// /*
//     eztz.contract.storage("KT1Ve3wAKYRRAp986HyFm1AxcWAdop8S2GVJ").then(function(res){
//         console.log(res); // Raw storage JSON object for contractAddress
//         console.debug(JSON.stringify(res));
    
//       }).catch(function(e){});
//       */


     

    
