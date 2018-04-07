//  Web3 intializer
//  ABI definition, Binary Data and contract Address in contractDetails.js

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var kycContract = web3.eth.contract(abi);
/*var deployedContract = kycContract.new({
    data: binaryData,
    from: web3.eth.accounts[0],
    gas: 4700000
});*/
var contractInstance = kycContract.at(contractAddress);

//  account to make all transactions

var current_account = web3.eth.accounts[0];
var user_name = localStorage.username_c;

//  function to fill customer data in form

function fillForm() {
    //  alert(user_name);
    var oldData = contractInstance.viewCustomer.call(user_name, {
        from: current_account,
        gas: 4000000
    });
    //  alert(oldData);
    document.getElementById("customer_rating").innerHTML = contractInstance.getCustomerRating.call(user_name, {
        from: current_account,
        gas: 4000000
    }) / 100;
    var toFill = "";
    for (var i = 0, j = 0; i < (oldData.length - 2); ++i) {
        if (oldData[i] == '!' && oldData[i + 1] == '@' && oldData[i + 2] == '#') {
            if (j == 7) {
                document.getElementById("gender_m").innerHTML = toFill;
                j += 2;
                i += 2;
                toFill = "";
                continue;
            }
            if (toFill == "")
                toFill = "Null";
            document.getElementById(allIds[j]).innerHTML = toFill;
            toFill = "";
            j++;
            i += 2;
            continue;
        }
        toFill = toFill + oldData[i];
    }

    document.getElementById("bank_name").innerHTML = contractInstance.getCustomerBankName.call(user_name, {
        from: current_account,
        gas: 4000000
    });
    document.getElementById("bank_rating").innerHTML = (contractInstance.getCustomerBankRating.call(user_name, {
        from: current_account,
        gas: 4000000
    })) / 100;
}

//  fill the KYC form

fillForm();
var arr = [];

function what() { 
	//alert("What is Called again");
    var cnt = 0; 
    var add = "not";
    for (var i = 0; add != "0x14e041521a40e32ed88b22c0f32469f5406d757a"; ++i) {
        add = contractInstance.getBankRequests.call(user_name, i);
        if (add == "0x14e041521a40e32ed88b22c0f32469f5406d757a" || add == "0x0000000000000000000000000000000000000000")
            break;
		//alert("Address is "+add);
        document.write("<div class=\"div-table\"  style=\"width: 100%;\"><div class=\"form-group\"><div class=\"1div-table-row\"><div class=\"1div-table-col\"><label class=\"col-md-4 control-label\" id = \"bank_name_l\">" + contractInstance.getBankName.call(add) + " Bank wants to validate your form detail: </label></div><div class=\"1div-table-col\"><div class=\"col-md-4 inputGroupContainer\" style=\"margin-left: 126px;\"><div class=\"input-group\"><button type=\"submit\" id = \"addKYCSend\" onclick = \"return allow(" + i.toString() + ")\">Approve </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type=\"submit\" id = \"addKYCSend1\" onclick = \"return deny(" + i + ")\">Disapprove </button></div></div></div><br></div>");
        arr.push(add);
        cnt++;
    }
    //alert("Total count of i is"+i);
} 
 
function allow(num) {
    //alert(num);
    alert("Allow " + arr[num] + " ?");
    contractInstance.allowBank.sendTransaction(user_name, arr[num], true, { from: web3.eth.accounts[0], gas: 4000000 });
	$('#addKYCSend1').prop('disabled', true);
$('#addKYCSend').prop('disabled', true);

    return false;
}

function deny(num) {
    alert("Deny " + arr[num] + " ?");
    contractInstance.allowBank.sendTransaction(user_name, arr[num], false, { from: web3.eth.accounts[0], gas: 4000000 });
	$('#addKYCSend1').prop('disabled', true);
$('#addKYCSend').prop('disabled', true);

    return false;
}