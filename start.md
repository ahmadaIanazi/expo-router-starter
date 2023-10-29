# FOR DEVELOPMENT

- [Start]
npx expo start --clear

- [Simulator]
eas build --profile development-simulator --platform ios

- [Device]
eas build --profile development --platform ios

## Doctor

npx expo install --fix
watchman watch-del-all
npx expo-doctor

# For Production

- [Update]

eas update --branch production --message "Bold Update Quick Fix."

# Submit to App Store

Use [`EAS`](to_configure_onAirUpdate) to be able to push updates to the `app/` directory.

[1] [Configure]
eas update:configure

[2] [Build]
eas build --platform ios

[3] [Submit]
eas submit -p ios --latest

## EAS JSON

  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "development-simulator": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "ios": {
        "simulator": true
      }
    },
    "internal": {
      "ios": {
        "distribution": "internal"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "<wecodesaudi@gmail.com>",
        "ascAppId": "6448721405",
        "appleTeamId": "PV3M586KN2"
      }
    }
  }
