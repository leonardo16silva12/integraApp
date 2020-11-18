import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage {

  public listaCategorias = [];

  constructor(
    private categoriaService: CategoriaService,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  ) { }

  private carregarLista() {
    this.categoriaService.listar().subscribe(dados => {
      this.listaCategorias = dados['content'];
      console.log(dados);
      this.presentToast('Categorias carregadas com sucesso!');
    });
  }

  ionViewWillEnter() {
    this.carregarLista();
  }

  public deletar(id: number) {
    this.categoriaService.deletar(id).subscribe(dados => {
      this.presentToast('Categoria deletada com sucesso!');
      this.carregarLista();
    });
  }

  async presentToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      cssClass: 'toastCss',
      message: mensagem,
      duration: 2500
    });
    toast.present();
  }

  async presentAlertConfirm(id) {
    const alert = await this.alertCtrl.create({
      header: 'Atenção',
      message: `Deseja realmente excluir? <br/><strong>ID: ${id}</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Ok',
          handler: () => {
            this.deletar(id);
          }
        }
      ]
    });

    await alert.present();
  }


}
