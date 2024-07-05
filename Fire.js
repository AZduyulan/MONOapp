// import firebase from "firebase";
import '@firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6HPz0GgEvaMW5VR07ylttEzQ2bqAafjA",
  authDomain: "monoapp-e5da0.firebaseapp.com",
  projectId: "monoapp-e5da0",
  storageBucket: "monoapp-e5da0.appspot.com",
  messagingSenderId: "779153083173",
  appId: "1:779153083173:web:07b2b84ea811de128f28cc"
};

class Fire {

  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user);
      }
      else {
        firebase.auth().signInAnonymously().catch(error => { callback(error) });
      }
    });
  }
  // bM5O7uMLeRHYfs9LA43o bu firebasedeki id 
  getLists(callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot(snapshot => {
      lists = [];
      snapshot.forEach(doc => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }

  addList(list){
    let ref = this.ref;
    ref.add(list);
  }

  updateList(list){
    let ref = this.ref;
    ref.doc(list.id).update(list)
  }


  get userId() {
    return firebase.auth().currentUser.uid;
  }

  get ref(){
    return firebase.firestore().collection("users").doc(this.userId).collection("lists");
  }

  detach(){
    this.unsubscribe();
  }
}

export default Fire;