<style>
.pane-login-container {
  /*border: 1px solid cornflowerblue;*/
  min-width: 200px;
  max-width: 400px;
  border-radius: 4px;
  margin: 60px auto auto auto;
  padding: 60px 20px 60px 20px;
}
.text-login {
  margin-bottom: 12px;
}
.white-placeholder::placeholder {
  color: white;
  opacity: 0.8;
}
</style>

<script>
export default {
  name: 'login-vue',
  data: function () {
    return {
      username: 'abc@abc.com',
      password: 'password',

      showLoginContainer: true
      // carouselTopHeadlines: null,
      // commonError: null
    }
  },
  methods: {
    /*
    testing: function () {
      console.log(this.validateForm())
      console.log(window.FirebaseService)
      console.log(window.FirebaseService.getFirebase())
    },
    */
    /**
     * method to validate the form control contents (simply given and non '')
     * @returns {boolean}
     */
    validateForm: function () {
      let ok = false
      if (this.username && !window.TypeService.isEmptyString(this.username) &&
        this.password && !window.TypeService.isEmptyString(this.password)) {
        ok = true
      }
      return ok
    },
    signUpNewUser: function () {
      if (this.validateForm()) {
        let auth = window.FirebaseService.getFirebase().auth()

        auth.createUserWithEmailAndPassword(this.username, this.password).then(function (data) {
          // ** user.uid => the uid for the user created
          alert('account created successfully~')
        }, function (err) {
          alert('something is wrong => ' + err.message)
        })
      }
    },
    signIn: function () {
      let instance = this
      if (this.validateForm()) {
        let auth = window.FirebaseService.getFirebase().auth()

        auth.signInWithEmailAndPassword(this.username, this.password).then(function (data) {
          alert('login successfully')
          instance.showLoginContainer = false
        }, function (err) {
          alert('something is wrong =>' + err.message)
        })
      }
    },
    /**
     * get the css class for the login container
     * @returns {{"nf-hidden": boolean, "nf-show": boolean}}
     */
    cssGetLoginContainerDisplay: function () {
      if (this.showLoginContainer === true) {
        return {
          'nf-hidden': false,
          'nf-show': true
        }
      } else {
        return {
          'nf-hidden': true,
          'nf-show': false
        }
      }
    },
    cssGetAppContainerDisplay: function () {
      let option = this.cssGetLoginContainerDisplay()
      // toggle the settings
      option['nf-hidden'] = !option['nf-hidden']
      option['nf-show'] = !option['nf-show']

      return option
    },
    cssGetNavbarItemsDisplay: function () {
      if (document.querySelector) {
        let navbarItemsDiv = document.querySelector('#basicExampleNav')
        if (navbarItemsDiv.classList.contains('show')) {
          navbarItemsDiv.classList.remove('show')
        } else {
          navbarItemsDiv.classList.add('show')
        }
      }
    },

    navbarSignOut: function () {
      let instance = this
      let auth = window.FirebaseService.getFirebase().auth()
      auth.signOut().then(function (data) {
        alert('signout successfully!')
        // force to un-toggle navbar again
        instance.cssGetNavbarItemsDisplay()
        instance.showLoginContainer = true
      }, function (err) {
        alert('something is wrong => ' + err.message)
      })
    }
  }
}
</script>

<template>
  <div>
    <div class="pane-login-container" v-bind:class="cssGetLoginContainerDisplay()">
      <h2 style="margin-bottom: 24px;">newsfeed web</h2>
      <input class="form-control text-login" type="text" placeholder="email address" v-model="username" />
      <input class="form-control text-login" type="password" placeholder="password" v-model="password" />
      <div style="height: 16px;"></div>
      <button class="btn btn-primary" @click="signIn()">Log In</button>
      <button class="btn btn-secondary" @click="signUpNewUser()">Sign Up</button>
    </div>
    <!-- main app panel -->
    <div class="pane-app-container" v-bind:class="cssGetAppContainerDisplay()">
      <nav class="navbar navbar-expand-lg navbar-dark primary-color">
        <!-- Navbar brand -->
        <div>
          <a class="navbar-brand" href="#"><i class="fa fa-newspaper-o" aria-hidden="true"></i></a>
          <!-- TODO animation plus hide and show feature on icon toggled -->
          <span class="md-form">
            <input type="text" class="form-control-sm white-text white-placeholder" placeholder="search..." />
          </span>
        </div>

        <!-- Collapse button -->
        <button class="navbar-toggler" type="button" @click="cssGetNavbarItemsDisplay()">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse animated slideInUp" id="basicExampleNav">
          <!-- Links -->
          <ul class="navbar-nav mr-auto" style="float: left;">
            <!-- apply class active if button / link selected -->
            <li class="nav-item">
              <a class="nav-link" href="#">Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#" @click="navbarSignOut()">Sign Out</a>
            </li>
          </ul>
          <!-- Links -->
        </div>
      </nav>
      <router-view />
    </div>
  </div>
</template>
