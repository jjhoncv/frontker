let Button = function() {

}

let Modal = function() {

}

let Login = function() {
  let st = {
    frmLogin: '.frm-login'
  }
  let dom = {}
  catchDom = function(){
    dom.frmLogin = $(st.frmLogin);
  }
}

let button = new Button();
let modal = new Modal();
let login = new Login();

button.click(function(){
  modal.setContent(login.getHTML());
  modal.open(function(){
    login.init();
  });
});
