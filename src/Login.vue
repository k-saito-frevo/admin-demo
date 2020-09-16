<template>
  <v-app >
    <div id="content">
      <v-card width="500px" class="mx-auto" style="margin-top:180px">
          <div :class='[$style.loginAvatar,$style.center]'>
              <v-avatar size="60" >
                  <v-img v-bind:src="require('@/assets/frevo.png')"/>
              </v-avatar>
          </div>
          <v-card-title>
              <div class="font-weight-light" :class="$style.loginLogo">FW-WEB</div>
          </v-card-title>
          <v-card-text>
            <v-form>
                <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" />
                <v-text-field v-bind:type="showPwd ? 'text' : 'password'" prepend-icon="mdi-lock" append-icon="mdi-eye-off" label="パスワード" @click:append="showPwd = !showPwd"/>
                <v-card-actions :class='$style.center'>
                  <v-btn class="light-green" to="/operation/temperature" :class="$style.routerLink" style="color:white;font-size:18px; width:100%">
                    ログイン
                  </v-btn>
                </v-card-actions>
            </v-form>
          </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
  export default {
    beforeCreate(){
      // var test = prompt("PWを入力してください")
      // if(test != "frevo") window.location = 'https://google.com'
    },
    name: 'Login',
    data () {
      return {
        showPwd:false
      }
    },
  }
</script>

<style module>
.loginLogo {
    width:100%;
    text-align:center;
    font-size:32px;
    color:black;
}
.loginAvatar{
    size:60;
}
.routerLink{
    text-decoration: none;
}
.center{
    text-align:center;
}
</style>