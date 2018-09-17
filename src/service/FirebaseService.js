
let FirebaseService = function (configFile, firebase) {
  return {
    getFirebase: function () {
      return firebase
    },
    init: function () {
      firebase.initializeApp(configFile.firebase)
    }
  }
}

export default function (configFile, firebase) {
  return new FirebaseService(configFile, firebase)
}
