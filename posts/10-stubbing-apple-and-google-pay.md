---
title: Stubbing the Payment Request API for testing
date: 2019-07-02
tags: 
  - notes
layout: layouts/post.njk
---

Earlier this year I worked on making [Apple Pay] and [Google Pay] available to users of [GOV.UK Pay]. Which [we blogged when we launched](https://technology.blog.gov.uk/2019/05/30/how-we-implemented-apple-pay-and-google-pay-on-gov-uk-pay/).

Initially I intended to make it all work with the [Payment Request API], which is the open standard but after reading the docs and having a meeting with Apple, I decided the benefits of using Apple’s extra methods and helps made using the [Apple Pay JS API] a no brainer. It doesn’t require you to include any extra script tags as it’s all built into Safari. Apple has [since made Safari more compaitble](https://developer.apple.com/documentation/safari_release_notes/safari_12_1_release_notes#3130317) with the [Payment Request API] so I might revisit going vanilla once users have had chance to update to the latest version.

On the other hand I had a go with the Google Pay JS API which shims itself to work in every browser and drops about twelve different tracking scripts into your page to see what you might be buying. So I went with the a [standard Payment Request API](https://developers.google.com/pay/api/web/guides/paymentrequest/tutorial) approach, declaring Google Pay as the payment provider.

## Testing

Next came to work out how we could write browser tests for this, we use [Cypress] which is excellent. However I’d need to stub Apple Pay and the Payment Request API. This turned out to be fairly straight forward I didn’t find much whilst searching for solutions save for this out of date [repo by IndieGoGo].

Cypress makes it pretty easy to stub out a browser function by using the `onBeforeLoad` hook.

```js
cy.visit(`/pay`, {
  onBeforeLoad: win => {
    // Stub Apple Pay API (which only exists within Safari)
    win.ApplePaySession = getMockApplePayClass(validPaymentRequestResponse, 'valid@email.test')  }
})
```

## Stub for Apple Pay

Apple has quite a few functions that need to be stubbed in order to simulate what happens for real.

```js
// Mock class for Apple Pay
const getMockApplePayClass = (validPaymentRequestResponse, email) => {
  class MockApplePaySession {
    completePayment () {
      return true
    }

    completeMerchantValidation () {
      return true
    }

    begin () {
      if (this._onvalidatemerchant) {
        this._onvalidatemerchant(
          { validationURL: 'https://fakeapple.url' }
        )
      }

      if (this._onpaymentauthorized) {
        this._onpaymentauthorized(
          { payment: validPaymentRequestResponse(email) }
        )
      }
    }

    set onvalidatemerchant (value) {
      this._onvalidatemerchant = value
    }

    set onpaymentauthorized (value) {
      this._onpaymentauthorized = value
    }
  }

  // Mock function to trick JS into thinking Apple Pay is available
  MockApplePaySession.canMakePayments = () => true
  MockApplePaySession.supportsVersion = () => true

  return MockApplePaySession
}
```

The `validPaymentRequestResponse` is what Apple Pay returns when the user authorises using their device. You can see [an example reponse here](https://github.com/alphagov/pay-frontend/blob/ad6ece196ced3822ef26547edebcd05f306bb85e/test/cypress/integration/web-payments/apple-pay.spec.js#L8-L36).

## Stub for Payment Request API

We don’t need to stub anything Google specific here the implementation is just the vanilla [Payment Request API].

The shim to add the API to Cypress is a little different from above and for some reason I needed to do it two different ways for headed and headless.

```js
cy.visit(`/pay`, {
  onBeforeLoad: win => {
    // Stub Payment Request API
    if (win.PaymentRequest) {
      // If we’re running in headed mode
      cy.stub(win, 'PaymentRequest', getMockPaymentRequest(validPaymentRequestResponse))
    } else {
      // else headless
      win.PaymentRequest = getMockPaymentRequest(validPaymentRequestResponse)
    }
  }
```

And then the mock payment request is much simpler.

```js
const const getMockPaymentRequest = validPaymentRequestResponse => {
  return () => {
    return {
      canMakePayment: () => new Promise(resolve => resolve(true)),
      show: () => new Promise(resolve => resolve(validPaymentRequestResponse))
    }
  }
}
```

The `validPaymentRequestResponse` when using the Payment Request API is a little different to with Apple Pay but you can [an example reponse here](https://github.com/alphagov/pay-frontend/blob/ad6ece196ced3822ef26547edebcd05f306bb85e/test/cypress/integration/web-payments/google-pay.spec.js#L8-L28).

Anyway hopefully that will be useful for anyone looking to do this.

[Apple Pay]: https://applepaydemo.apple.com/
[Google Pay]: https://pay.google.com/about/
[GOV.UK Pay]: https://www.payments.service.gov.uk/
[Payment Request API]: https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API/Using_the_Payment_Request_API
[Apple Pay JS API]: https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api
[Cypress]: https://www.cypress.io/
[repo by IndieGoGo]: https://github.com/indiegogo/apple-pay-js-stubs
