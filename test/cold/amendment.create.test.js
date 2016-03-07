'use strict';

// object: amendment
// description: https://knowledgecenter.zuora.com/DC_Developers/SOAP_API/E_SOAP_API_Calls/amend_call
// xml example: https://knowledgecenter.zuora.com/DC_Developers/SOAP_API/E1_SOAP_API_Object_Reference/Amendment/Update_a_Product_(Amendment)

var test   = require('tape');
var xml    = require('../../lib/xml');
//var config = require('../../etc/config.test.json');

test('amendment.create: valid xml', function (t) {
  var testCount = 3;
  t.plan(testCount);

  // From Issue #125
  var amendment = {
    Name: "test_amend1279683889873",
    Type: "UpdateProduct",
    EffectiveDate: "2010-07-21",
    ContractEffectiveDate: "2010-07-21",
    CustomerAcceptanceDate: "2010-07-21",
    RatePlanData: {
      RatePlan: {
        AmendmentSubscriptionRatePlanId: "ratePlan.Id"
      },
      "RatePlanChargeData": [{
        RatePlanCharge: {
          ProductRatePlanChargeId: "productRatePlan.Id",
          Description: '111111',
          Price: '1000',
          Quantity: 456
        }
      }]
    },
    ServiceActivationDate: "2010-07-21",
    SubscriptionId: "subscription.Id"
  };

  // expected output according to Zuora docs:
  /***
  var output = `<zns:create xmlns:ns1="http://api.zuora.com/">
    <zns:zObjects xmlns:ns2="http://object.api.zuora.com/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="ons:Amendment">
      <ons:Name>test_amend1279683889873</ons:Name>
      <ons:Type>UpdateProduct</ons:Type>
      <ons:EffectiveDate>2010-07-21</ons:EffectiveDate>
      <ons:ContractEffectiveDate>2010-07-21</ons:ContractEffectiveDate>
      <ons:CustomerAcceptanceDate>2010-07-21</ons:CustomerAcceptanceDate>
      <ons:RatePlanData>
        <zns:RatePlan xsi:type="ons:RatePlan">
          <ons:AmendmentSubscriptionRatePlanId>ratePlan.Id</ons:AmendmentSubscriptionRatePlanId>
        </zns:RatePlan>
        <zns:RatePlanChargeData>
          <zns:RatePlanCharge xsi:type="ons:RatePlanCharge">
            <ons:Description>111111</ons:Description>
            <ons:Price>1000</ons:Price>
            <ons:Quantity>456</ons:Quantity>
            <ons:ProductRatePlanChargeId>productRatePlan.Id</ons:ProductRatePlanChargeId>
          </zns:RatePlanCharge>
        </zns:RatePlanChargeData>
      </ons:RatePlanData>
      <ons:ServiceActivationDate>2010-07-21</ons:ServiceActivationDate>
      <ons:SubscriptionId>subscription.Id</ons:SubscriptionId>
    </zns:zObjects>
  </zns:create>`;
  ***/

  var result = xml.convert('create', amendment, 'amendment');

  console.log('---');
  console.log(result);
  console.log('---');
  //console.log(output)

  t.ok(result, 'result is empty');
  t.ok(/ons:RatePlanData/.test(result), 'RatePlanData must have ons/ns2 namespace prefix');
  t.ok(/zns:RatePlanChargeData/.test(result), 'RatePlanChargeData must have zns/ns1 namespace prefix');

});

test.skip('xml: chunk big requests into smaller groups', function(t) {
  t.ok(true, 'placeholder');
});

