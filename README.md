# shop-com-test
This is a test app for Market Amerika. 

## Building the app
Run `yarn` to install dependencies and then run `npx pod-install ios` to install pods for ios.

### Configuration files
Add `.development` and `.production` files to the `.env` folder.
Use following environment variables to configure the app: 
```text
API_URL=https://api2.shop.com/AffiliatePublisherNetwork/v2
API_KEY=<Your api key here>
```

### Building an app
See [iOS](https://reactnative.dev/docs/publishing-to-app-store) and [Android](https://reactnative.dev/docs/signed-apk-android) guides.
You can also run it locally using `yarn run ios` or `yarn run android`.
PS. Loading screen/animation is iOS only. 

## Strengths and limitations:
Basically, this app could be extended to the fully featured production app. 
The biggest issue is with `productsSlice.ts` caching requests without any mapping. It was made for simplicity,
but it prevents me from making infinity scroll. It can be solved easily, by removing `start` and `perPage` 
from the hash and adding last loaded `start` map per request. 
Also, there is no way to manage async stuff/actions yet. Usually I do this with Redux Sagas.  



## FEATURES TODO:

* Pro-active caching (?)
* TESTS (Unit, E2E)
* Infinitive scroll
