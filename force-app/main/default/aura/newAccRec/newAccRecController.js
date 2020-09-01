({
	clickCreate : function(component, event, helper) {
        var valid = component.find('accform').reduce(function (validSoFar, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
      
        if(valid){
        var newAccRec = component.get("v.newAcc");
        var action= component.get("c.saveAccount");
        action.setParams({ "acc": newAccRec});
        action.setCallback(this,function(response){
            var state= response.getState();
            if(state === "SUCCESS"){
				var name =response.getReturnValue(); 
                console.log("hii"+name);
            }
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : 'Success Message',
            message: 'Account created suucessfully.',
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
        });
        $A.enqueueAction(action);
        }
	},
    doInit: function(component, event, helper) {
        var action = component.get("c.getIndustry");
        action.setCallback(this, function(a) {
            var result = a.getReturnValue();
            console.log(result);
            component.set("v.options", result);
          });
        $A.enqueueAction(action); 
    }
})