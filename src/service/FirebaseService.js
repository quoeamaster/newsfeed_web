
let FirebaseService = function (configFile, firebase) {
  return {
    getFirebase: function () {
      return firebase
    },
    init: function () {
      firebase.initializeApp(configFile.firebase)
    },
    getFirestorePreferencesByUID: function (uid, vuexStore) {
      let db = firebase.firestore()
      db.settings({
        timestampsInSnapshots: true
      })
      db.collection('preferences').doc(uid).get().then(doc => {
        if (doc.exists) {
          vuexStore.commit('setPrefsRecord', doc.data())
        } else {
          let newPref = {
            userId: uid,
            keywords: []
          }
          db.collection('preferences').doc(uid).set(newPref).then(doc => {
            if (doc) {
              vuexStore.commit('setPrefsRecord', doc.data())
            }
          })
        }
      }).catch(err => {
        console.log(err)
        alert(err)
      })
    },
    updateFirestorePreferencesByUID: function (uid, keyword, vuexStore) {
      let db = firebase.firestore()
      db.settings({
        timestampsInSnapshots: true
      })
      db.collection('preferences').doc(uid).get().then(doc => {
        if (doc.exists) {
          let data = doc.data()
          let arrKeywords = data.keywords
          let exists = false
          let minHits = 999999999999
          let minPosition = -1

          for (let i = 0; i < arrKeywords.length; i++) {
            let current = arrKeywords[i]
            if (current['keyword'] === keyword) {
              current['hits'] = current['hits'] + 1
              exists = true
            } else {
              if (minHits >= current['hits']) {
                minHits = current['hits']
                minPosition = i
              }
            }
          }
          // non exists in the keywords plus there is a keyword with only 1 hit too... replace this oldest one...
          if (arrKeywords.length < 5) {
            arrKeywords.push({
              keyword: keyword,
              hits: 1
            })
          } else if (arrKeywords.length >= 5) {
            if (!exists && minHits === 1) {
              arrKeywords[minPosition] = {
                keyword: keyword,
                hits: 1
              }
            }
          }
          vuexStore.commit('setPrefsRecord', data)
          // update back to firestore
          db.collection('preferences').doc(uid).set(data).catch(err => {
            console.log('update failed')
            console.log(err)
            alert(err)
          })
        } else {
          console.log('*** should NOT be running this branch condition')
          // create a new empty preference
          let newPref = {
            userId: uid,
            keywords: [{
              keyword: keyword,
              hits: 1
            }]
          }
          db.collection('preferences').doc(uid).set(newPref).then(doc => {
            if (doc) {
              vuexStore.commit('setPrefsRecord', doc.data())
            }
          })
        }
      })
    }
  }
}

export default function (configFile, firebase) {
  return new FirebaseService(configFile, firebase)
}
