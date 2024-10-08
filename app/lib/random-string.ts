export function randomString(longitud: number) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    const caracteresLongitud = caracteres.length;
  
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresLongitud);
      resultado += caracteres.charAt(indiceAleatorio);
    }
  
    return resultado;
}