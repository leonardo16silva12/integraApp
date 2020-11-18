import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.page.html',
  styleUrls: ['./alterar.page.scss'],
})
export class AlterarPage {

  public id: number;
  public nome: string;

  constructor(
    private categoriaService: CategoriaService,
    public toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.id = this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.categoriaService.buscarPorId(this.id).subscribe(dados => {
      this.id = dados['id'];
      this.nome = dados['nome'];
    });
   }

   public salvar() {
    if (this.nome && this.nome != '') {
      const categoria: Categoria = {
        id: this.id,
        nome: this.nome
      };

      this.categoriaService.alterar(categoria).subscribe(() => {
        this.presentToast('Categoria alterada com sucesso!!!');
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
