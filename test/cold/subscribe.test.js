'use strict';

// object: amendment
// description: https://knowledgecenter.zuora.com/DC_Developers/SOAP_API/E_SOAP_API_Calls/subscribe_call
// xml example: https://knowledgecenter.zuora.com/DC_Developers/SOAP_API/E_SOAP_API_Calls/subscribe_call/Invoke_the_subscribe_Call

var test   = require('tape');
var xml    = require('../../lib/xml');
//var config = require('../../etc/config.test.json');

test('subscribe: valid xml for new account', function (t) {
  var testCount = 3;
  t.plan(testCount);

  var subscribeRequest = {
    subscribes: {
      Account: {
        AccountNumber: 't-1246636315.4928',
        AutoPay: false,
        Batch: 'Batch1',
        BillCycleDay: 1,
        BcdSettingOption: 'ManualSet',
        CrmId: 'SFDC-1230273269317',
        Currency: 'USD',
        CustomerServiceRepName: 'CSR Dude',
        Name: 'Company XYZ, Inc.',
        PaymentTerm: 'Due Upon Receipt',
        PurchaseOrderNumber: 'PO-1230273269317',
        SalesRepName: 'Sales Person',
      },
      PaymentMethod: {
        CreditCardAddress1: '123 Main',
        CreditCardCity: 'San Francisco',
        CreditCardCountry: 'United States',
        CreditCardExpirationMonth: '1',
        CreditCardExpirationYear: '2011',
        CreditCardHolderName: 'Test Name',
        CreditCardNumber: '5105105105105100',
        CreditCardPostalCode: '94109',
        CreditCardState: 'California',
        CreditCardType: 'MasterCard',
        Type: 'CreditCard'
      },
      BillToContact: {
          Address1: '123 Main',
          Address2: 'APT 1',
          City: 'San Francisco',
          Country: 'United States',
          FirstName: 'Erik',
          LastName: 'Nordstrom',
          PostalCode: '94109',
          State: 'California',
          WorkEmail: 'test@email.com',
          WorkPhone: '4155551212'
      },
      SubscribeOptions: {
        GenerateInvoice: 'true',
        ProcessPayments: 'true'
      },
      SubscriptionData: {
        Subscription: {
          AutoRenew: 'true',
          // See Working With Dates   - All datetimes are converted to GMT-08:00
          ContractAcceptanceDate: '2009-07-03',
          ContractEffectiveDate: '2009-07-03',
          InitialTerm: '12',
          Name: 'A-S00000020090703080755',
          RenewalTerm: '12',
          ServiceActivationDate: '2009-07-03',
          TermStartDate: '2009-07-03',
        },
        RatePlanData: {
          RatePlan: {
            ProductRatePlanId: '4028e6991f863ecb011fb8b7904141a6',
          },
        }
      }
    }
  };

  // expected output according to Zuora docs:
  // xml example: https://knowledgecenter.zuora.com/DC_Developers/SOAP_API/E_SOAP_API_Calls/subscribe_call/Invoke_the_subscribe_Call

  var result = xml.convert('subscribe', subscribeRequest, 'subscribeRequest');

  console.log('---');
  console.log(result);
  console.log('---');
  //console.log(output)

  t.ok(result, 'result is empty');
  t.ok(/zns:Account/.test(result), 'Account must have zns/ns1 namespace prefix');
  t.ok(/zns:subscribes/.test(result), 'Subscribes must have zns/ns1 namespace prefix');
  t.ok(/zns:SubscribeOptions/.test(result), 'SubscribeOptions must have zns/ns1 namespace prefix');
  t.ok(/zns:SubscriptionData/.test(result), 'SubscriptionData must have zns/ns1 namespace prefix');
  t.ok(/zns:Subscription/.test(result), 'Subscription must have zns/ns1 namespace prefix');
  t.ok(/zns:GenerateInvoice/.test(result), 'GenerateInvoice must have zns/ns1 namespace prefix');
  t.ok(/zns:ProcessPayments/.test(result), 'ProcessPayments must have zns/ns1 namespace prefix');

  // TODO: Do namespaces matter? The same subscribe method has both ns1 and ns2 namespaces on
  // the RatePlanData for subscribe() depending upon new account(ns1) and existing account(ns2).
  t.ok(/zns:RatePlanData>/.test(result), 'RatePlanData must have zns/ns1 namespace prefix');

  t.ok(/ons:RatePlan /.test(result), 'RatePlan must have ons/ns2 namespace prefix');
  t.ok(/zns:ProductRatePlanId>/.test(result), 'ProductRatePlanId must have zns/ns1 namespace prefix');
  t.ok(/ons:RatePlanChargeData>/.test(result), 'RatePlanChargeData must have ons/ns2 namespace prefix');
  t.ok(/ons:RatePlanCharge>/.test(result), 'RatePlanChargeData must have ons/ns2 namespace prefix');
  t.ok(/zns:ProductRatePlanChargeId>/.test(result), 'ProductRatePlanChargeIdData must have zns/ns1 namespace prefix');

});

test.skip('subscribe: valid xml for existing account', function(t) {
  // TODO: Use sample calling subscribe() for an Existing Account XML
  // from https://knowledgecenter.zuora.com/DC_Developers/SOAP_API/E_SOAP_API_Calls/subscribe_call/Invoke_the_subscribe_Call

  // TODO: Do namespaces matter? The same subscribe method has both ns1 and ns2 namespaces on
  // the RatePlanData for subscribe() depending upon new account(ns1) and existing account(ns2).
  t.ok(/zns:RatePlanData>/.test(result), 'RatePlanData must have zns/ns1 namespace prefix');
});

