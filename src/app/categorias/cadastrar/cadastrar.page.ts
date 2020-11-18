import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage {

  public nome;

  constructor(
    private categoriaService: CategoriaService,
    public toastCtrl: ToastController,
    private router: Router
  ) { }

  public salvar() {
    if (this.nome && this.nome != '') {
      const categoria = { nome: this.nome };

      this.categoriaService.salvar(categoria).subscribe(() => {
        this.presentToast('Categoria cadastrada com sucesso!!!');
        this.router.navigateByUrl('/categorias/listar');
      })
    }
  }

  async presentToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      cssClass: 'toastCss',
      message: mensagem,
      duration: 2500
    });
    toast.present();
  }

}
