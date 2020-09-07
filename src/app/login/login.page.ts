import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DblinkService } from '../service/dblink.service';
import { ToastController } from '@ionic/angular';
import { AuthService, AuthResponseData } from '../service/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { SurveyService } from '../service/survey.service';
import { JsonPipe } from '@angular/common';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

 isLoading = false;
 isLogin = true;
 forgot = false;


nom: string = '';
prenom: string = '';
sexe: string = '';
email: string = '';
confirm_email: string = '';
password: string = '';
confirm_password: string = '';

// Our translated text strings
private loginErrorString: string;
private opt: string = 'signin';
login = true;
register = false;
intro = false;
user_id;
server;
stravaCode= '';
body = {};




  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private postService: DblinkService,
    private toastController: ToastController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private surveyService: SurveyService) { 

      this.authService.userId.subscribe(resData => {
        this.user_id = resData;
        //console.log(this.user_id);
    });
    this.server = this.authService.server;

      // Plugins.Storage.get({key: 'tutoComplete'}).then(val => {
      //   if (val.value == null) {
      //     Plugins.Storage.set({key: 'tutoComplete',value : 'true'});
      //   } else {
      //     this.intro = false;
      //   }
      // })

    }

  ngOnInit() {

    // Plugins.Storage.get({ key: 'authData' }).then( res => {
    //   console.log(res);
    //   if (res.value){
    //     return this.authService.autoLogin();
    //   }
    // })

    // Plugins.Storage.get({key : "TestCookie"}).then(val => {
    //   console.log(val);
    // })
    let urlParams = new URLSearchParams(window.location.search);
    let myParam = urlParams.get('email');
    // this.stravaCode = urlParams.get('code');
    // if (this.stravaCode != '') {
    //   console.log(this.stravaCode);
    //   let body = {
    //     code: this.stravaCode,
    //     aski: 'saveStravaCode'
    //   }
    //   this.http.post(this.server + 'saveStrava.php',body).subscribe(resData=> {
    //     console.log(resData);
    //   })
    // }

    //console.log(myParam);
    if (myParam) {
      let message = 'Votre compte a été vérifié, vous pouvez maintenant vous connecter.'
      this.showInscriptionValide(message);
      
    }
    
  }

  goToTuto() {
    this.surveyService.loadingBetweenPage('/tuto');
  }

    formRegister() {
      this.intro = false;
      this.register = true;
      this.login = false;
    // this.router.navigate(['/register']);
  }

//     async authenticate() {
// let headers = new HttpHeaders({
//     		'Content-Type': 'application/json; charset=UTF-8'
//     	});
// let options = {headers:headers};

//     if (this.email != '' && this.password != '') {
//       let body = {
//         email: this.email,
//         password: this.password,
//         aksi: 'login'
//       };
//       this.authService.login(body).subscribe(async data => {
//         console.log(data);
//        if (data) {
//           this.storage.set('session_storage', data['result']);
          
//          // console.log(data.result);
//           this.router.navigate(['/tabs/tab1']);
//          const toast = await this.toastController.create({
//           message: 'Welcome!',
//           duration: 2000
//          });
//          toast.present();
//        } else {
//          const toast = await this.toastController.create({
//            message: 'error',
//            duration: 2000
//          });
//          toast.present();
//        }
//      })

//     } else {
//       const toast = await this.toastController.create({
//         message: 'Username or password invalid',
//         duration: 2000
//       });
//       toast.present();
//     }

//     this.email = '';
//     this.password = '';

//     }


    async authenticate() {

      if (this.email == '') {
        const toast = await this.toastController.create({
          message: 'Entrez votre email',
          duration: 2000
          });
        toast.present();
      } else if (this.password == '') {
        const toast = await this.toastController.create({
          message: 'Entrez votre mot de passe',
          duration: 2000
          });
        toast.present();
      };
        this.body = {
          email: this.email,
          password: this.password,
          aksi: 'login'
        };


      this.isLoading = true;
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Logging in...' })
        .then(loadingEl => {
          loadingEl.present();
          let authObs: Observable<AuthResponseData>;
          if (this.isLogin) {
            authObs = this.authService.login(this.body);
            console.log(this.body);
          } else {
            // authObs = this.authService.signup(email, password);
          }
          authObs.subscribe(
            resData => {
              console.log(resData);
              this.isLoading = false;
              loadingEl.dismiss();
              this.router.navigate(['/tabs/tab1']);
            },
            errRes => {
              console.log(errRes);
              loadingEl.dismiss();
              // const code = errRes.error.error.message;
              // let message = 'Could not sign you up, please try again.';

                let message = 'Votre email et/ou votre mot de passe ne sont pas corrects';
    
              this.showAlert(message);
            }
          );
        });
    }
    
    private showAlert(message: string) {
      this.alertCtrl
        .create({
          header: 'Echec connexion',
          message: message,
          buttons: ['OK']
        })
        .then(alertEl => alertEl.present());
    }

    private showEmailSend(message: string) {
      this.alertCtrl
        .create({
          header: 'Validation inscription envoyée',
          message: message,
          buttons: ['OK']
        })
        .then(alertEl => alertEl.present());
    }

    private showPasswordReset(message: string) {
      this.alertCtrl
        .create({
          header: 'Oubli de mot de passe',
          message: message,
          buttons: ['OK']
        })
        .then(alertEl => alertEl.present());
    }

    private showInscriptionValide(message: string) {
      this.alertCtrl
        .create({
          header: 'Bienvenue sur Trainimm !',
          message: message,
          buttons: ['OK']
        })
        .then(alertEl => alertEl.present());
    }




    async addRegister() {

      let headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=UTF-8'
            });
      let options = {headers:headers};
          if (this.nom == '') {
            const toast = await this.toastController.create({
            message: 'Votre nom est obligatoire',
            duration: 2000
            });
            toast.present();
          } else if (this.prenom == '') {
            const toast = await this.toastController.create({
              message: 'Votre prénom est obligatoire',
              duration: 2000
              });
            toast.present();
      
          } else if (this.sexe == '') {
            const toast = await this.toastController.create({
              message: 'Votre sexe est obligatoire',
              duration: 2000
              });
            toast.present();
      
          }  else if (this.email == '') {
            const toast = await this.toastController.create({
              message: 'Email obligatoire',
              duration: 2000
              });
            toast.present();

          } else if (this.email != this.confirm_email) {
            const toast = await this.toastController.create({
              message: 'Les 2 emails doivent être identiques',
              duration: 2000
              });
            toast.present();
      
          }else if (this.password != this.confirm_password) {
            const toast = await this.toastController.create({
              message: 'Les mots de passe ne sont pas similaires',
              duration: 2000
              });
            toast.present();
          } else {
            let body = {
              nom: this.nom,
              prenom: this.prenom,
              sexe: this.sexe,
              email: this.email,
              password: this.password,
              aksi: 'add_register'
            };
            
            this.loadingCtrl
            .create({ keyboardClose: true, message: 'Chargement...' })
            .then(loadingEl => {
              loadingEl.present();
              
              this.postService.postData(body, 'register.php').subscribe(async data => {
                console.log(data);
               if (data['success'] == true) {
                 //this.router.navigate(['/login']);
                 this.login = true;
                 this.register = false;
                //  const toast = await this.toastController.create({
                //   message: 'Un email de vérification vous a été envoyé. Cela peut prendre quelques minutes',
                //   // message: 'Votre compte a été créé, vous pouvez vous connecter.',
                //   duration: 2000
                //  });
                 loadingEl.dismiss();
                 let message = 'Un email vous a été envoyé, cliquez sur le lien reçu pour valider votre inscription. Avec certaines messageries, ce dernier peut mettre jusqu\'à 24h pour arriver (il se peut également que le mail soit dans vos spams).';
                 this.showEmailSend(message);
                 this.email = '';
                 this.password = '';
                //  toast.present();
               }  else {
                 
                 if (data['error'] == "Duplicate entry " + "'" + this.email + "'" + " for key 'unique_email'") {
                  
                   const toast = await this.toastController.create({
                   message: 'Cet email est déjà utilisé',
                   duration: 4000
                 });
                 loadingEl.dismiss();
                   toast.present();
                 } else {
                   const toast = await this.toastController.create({
                   message: 'Erreur',
                   duration: 2000
                 });
                 loadingEl.dismiss();
                   toast.present();
                 }
               }
             });

            });

          }
        }
        
        goToForgotPassword() {
          this.login = false;
          this.forgot = true;
        }

        forgotPassword() {
          this.login = false;
          this.register = false;
          console.log('forgotpassword');
          let body = {
            email: this.email,
            aksi: 'forgotPassword'
          };
          this.loadingCtrl
            .create({ keyboardClose: true, message: 'chargement...' })
            .then(loadingEl => {
              loadingEl.present();
              let body = {
                email: this.email,
                aksi : 'forgotPassword',
              }
              this.postService.postData(body,'resetPassword.php').subscribe(
                resData => {
                  console.log(resData);
                  loadingEl.dismiss();
                  this.forgot = false;
                  this.login = true;
                  let message = 'Un email vous a été envoyé afin de réinitialiser votre mot de passe';
                  this.showPasswordReset(message);
                  //let message = 'Votre email et/ou votre mot de passe ne sont pas corrects';
    
                  //this.showAlert(message)
                  // this.router.navigate(['/login']);
                },
                errRes => {
                  console.log(errRes);
                  loadingEl.dismiss();
                  let message = 'Un email vous a été envoyé afin de réinitialiser votre mot de passe';
                  this.showPasswordReset(message);
                  this.forgot = false;
                  this.login = true;
                  // this.router.navigate(['login']);
                  // const code = errRes.error.error.message;
                  // let message = 'Could not sign you up, please try again.';
                  // if (code === 'EMAIL_EXISTS') {
                  //   message = 'This email address exists already!';
                  // } else if (code === 'EMAIL_NOT_FOUND') {
                  //   message = 'E-Mail address could not be found.';
                  // } else if (code === 'INVALID_PASSWORD') {
                  //   message = 'This password is not correct.';
                  // }
                  // this.showAlert(message);
                }
              );
            });
      
        }

        comeBackToLogin() {
          this.login = true;
          this.register = false;
          this.forgot = false;


        }

}
