![fulllogo_small](https://cloud.githubusercontent.com/assets/955108/26615904/c215fc70-4587-11e7-9329-23cecb5d83be.png)

Developed in 100% React Native, "The Comedy Companion" is the world's first productivity tool for Stand-Up Comedians. Manage your jokes, organize them into set lists, and track performances all in one place.

### Upcoming Features

- Email Export of Jokes, Set Lists, and Show recordings
- Cloud Storage for Android Users
- Customizable Categories, and filtering on those categories
- Running rating of Joke performance by swiping left for good, right for bad on a given show
- Web Browser editing of jokes through a websocket API

### Currently Available Features (v1.2)

- Associate an Audio Recording with any Given Show
- Track solid bits as well as those you're currently working on
- Associate detailed notes with each bit
- Create set lists with ease, dragging and dropping jokes into place, and track their estimated length
- Track every show you perform, which set list was used, the venue performed at including city and state
- Reorder everything on the fly as well as search for specific keywords in your bits
- Back everything up to your personal iCloud account for security and ease of transferring data between multiple iPhones and iPads (iOS Users Only)

### Installation Instructions

Installation should be ridiculously simple once you are set up for React Native development ([Getting Started With React Native](https://facebook.github.io/react-native/docs/getting-started.html)) . Simply clone the repository into whatever folder you like, go into that folder and type:

```
npm install
```

Once all the packages are done installing you should be able to simply type `react-native-run-ios` or `react-native-run-android` and the app should boot up in a simulator.

### Development Instructions

Please make all your pull requests on the `develop` branch. They will be merged in after review and releases will be cut from development to master whenever a group of features is deemed ready to go.

### Thank-yous go out to...

[**g-harel**](https://github.com/g-harel) - [**open-source-logos**](https://github.com/g-harel/open-source-logos) - The guy that drew our awesome little devil mascot/icon. Great work! Thanks so much!

[**GeekyAnts**](https://github.com/GeekyAnts) - [**react-native-hamburger**](https://github.com/GeekyAnts/react-native-hamburger) - Hamburger menu you see in the top left corner with the awesome animation when touched

[**manicakes**](https://github.com/manicakes) - [**react-native-icloudstore**](https://github.com/manicakes/react-native-icloudstore) - What allows iOS users to back up their jokes to their iCloud

[**ananddayalan**](https://github.com/ananddayalan) - [**react-native-material-design-searchbar**](https://github.com/ananddayalan/react-native-material-design-searchbar) - The searchbar used on the Jokes and Shows pages

[**ArnaudRinquin**](https://github.com/ArnaudRinquin) - [**react-native-radio-buttons**](https://github.com/ArnaudRinquin/react-native-radio-buttons) - The segmented controls that you see on the Options screen for controlling sort options

[**dereksweet**](https://github.com/dereksweet) - [**react-native-sliding-panes**](https://github.com/dereksweet/react-native-sliding-panes) - Hey it's me! This is the component that controls the 3 primary sliding panes for Jokes, Set Lists, and Shows

[**deanmcpherson**](https://github.com/deanmcpherson) - [**react-native-sortable-listview**](https://github.com/deanmcpherson/react-native-sortable-listview) - The awesome sortable ListView on the right side of the Set List Editor

[**xgfe**](https://github.com/xgfe) - [**react-native-ui-xg**](https://github.com/xgfe/react-native-ui-xg) - The nicely styled buttons that you see throughout the app

[**oblador**](https://github.com/oblador) - [**react-native-vector-icons**](https://github.com/oblador/react-native-vector-icons) - The package that serves up all the icons you see throughout the app

[**jsierles**](https://github.com/jsierles) - [**react-native-audio**](https://github.com/jsierles/react-native-audio) - The amazing package that allows the audio for shows to be recorded. Awesome work. 

[**zmxv**](https://github.com/zmxv) - [**react-native-sound**](https://github.com/zmxv/react-native-sound) - Another amazing package that allows for the playback of the audio recordings. Thanks man!

[**corbt**](https://github.com/corbt) - [**react-native-keep-awake**](https://github.com/corbt/react-native-keep-awake) - Great little tool that prevents the device from going to sleep due to inactivity while recording/timing shows. Just what was needed. 
