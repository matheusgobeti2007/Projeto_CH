
let botao = document.querySelector('#botaoEntrar')
botao.addEventListener('click', 
   async()=>{
      let email = document.querySelector('#usuario').value
      let senha = document.querySelector('#senha').value
      if(usuario != '' && senha != '')
      {
         let resposta = await fetch(`http://192.168.1.38:8080/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json" // Adiciona o cabeçalho correto
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
         })
         if(resposta.status == 200)
         {
            const id_usuario = await resposta.json()
            window.location.replace(`./home.html?id_usuario=${encodeURIComponent(id_usuario)}`)
            
         }
         else{
            alert('Usuario ou senha incorretos!')
         }
      }
      else{
         alert('Preencha todos os campos!')
      }
   }
)
 