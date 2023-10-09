import React from 'react'
import AdminNavbar from './AdminNavbar';
import AddToCartButton from './AddToCartButton';

function Testing() {
    function fetchData() {
        fetch("http://localhost:4000/testing")
          .then((response) => {
            if (!response.redirected) {
              throw new Error("redirected is false");
            }
            console.log(response.url)
            window.location.href = response.url
            
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
      
      
      
  return (
    <div className="d-flex">
      <div class="row">
        <container className="vh-100 col-2">
          <AdminNavbar/>
        </container>
        <div>
          <AddToCartButton />
        </div>
        <container className="col vh-100 overflow-auto">
          <div className="ml-3 mt-5 p-5 ">
            <h1>Testing </h1>
            <button onClick={fetchData}>Submit</button>
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a tellus in sem convallis commodo a at urna. Phasellus convallis pharetra hendrerit. Donec eu mollis justo. Nullam sed lorem lacus. Etiam sed odio velit. Nunc consectetur, turpis vel aliquam ultricies, orci dolor faucibus urna, quis suscipit dui tellus ac enim. Etiam laoreet, orci sit amet porttitor maximus, turpis ligula elementum neque, sed lobortis purus nibh id nisi.

              Mauris nulla turpis, fringilla ac orci nec, placerat hendrerit turpis. Fusce vestibulum lectus sit amet quam consectetur, at mattis urna pulvinar. Sed mattis nisi ut odio porta, eget ultricies ex sollicitudin. Nullam posuere facilisis felis, ac ultricies elit pharetra porta. Proin et fermentum libero. Nullam ac massa lacus. Donec in erat ligula. Pellentesque ut ex mauris. Maecenas in felis id lacus blandit mattis eu sed ipsum. Quisque in pretium quam.

              Curabitur condimentum nunc mi, in sagittis urna ultrices nec. Donec arcu metus, gravida quis sagittis efficitur, interdum at mauris. Vestibulum commodo mi tristique leo luctus posuere. Donec porta vulputate elit, at egestas nibh congue eget. Suspendisse luctus id urna sed pretium. Duis pellentesque viverra quam et bibendum. Etiam volutpat mauris ac tortor fermentum condimentum.

              Maecenas hendrerit turpis in venenatis volutpat. Donec porttitor massa neque, a condimentum risus condimentum at. Maecenas nec justo enim. Donec diam sem, commodo vel nibh in, dapibus vulputate sem. Sed gravida eget turpis quis mollis. In vel mauris eget mauris scelerisque vehicula sed eu eros. Vestibulum malesuada ultricies enim id maximus.

              Nam ac quam cursus magna mattis eleifend eu id lectus. Sed leo erat, ornare nec mi eget, tincidunt malesuada nisl. Nunc molestie leo sit amet urna dignissim condimentum. Donec at justo quis enim sollicitudin gravida. Duis sed ligula in eros accumsan accumsan eget a est. Donec euismod, ipsum ac faucibus scelerisque, purus tortor ultrices justo, et tempor massa enim vitae ligula. Aliquam mollis pretium tempus. Cras vel suscipit magna.

              Mauris sed eleifend tortor. Pellentesque tempor finibus ligula, nec aliquet ipsum luctus tincidunt. Aliquam fringilla urna molestie interdum sodales. Cras malesuada in arcu non rhoncus. Pellentesque finibus elementum magna ac pretium. Maecenas porta, ipsum vel tristique semper, ex dui commodo dolor, in consectetur eros odio a ipsum. Cras commodo nisl tincidunt, feugiat risus vitae, porta lorem. Aenean sollicitudin scelerisque libero a mollis. Mauris at ante at dui vehicula bibendum vel at nibh. In vestibulum, quam sit amet sagittis porttitor, mi mauris aliquet nibh, scelerisque fermentum dui ligula ac arcu. Vestibulum venenatis eget ante sed ultricies. Aenean enim libero, imperdiet non aliquam quis, suscipit ac risus.

              Quisque in justo in neque aliquet cursus sed ut orci. Fusce finibus nec augue in pharetra. Vestibulum dictum, lectus eget placerat imperdiet, nunc dui dapibus libero, vitae rhoncus erat diam nec turpis. Integer ac velit sed leo varius aliquet. In at aliquam lectus, aliquet cursus magna. Morbi nec metus metus. Morbi molestie finibus risus in pharetra. Nulla tempor risus ex, vel faucibus nulla gravida vel. Nunc at nulla at metus malesuada ullamcorper nec sit amet dui.

              Aliquam eleifend magna in neque ornare, non convallis quam eleifend. Aenean gravida, ipsum sed consequat lobortis, turpis ipsum tristique urna, sit amet bibendum nibh enim quis velit. Pellentesque feugiat bibendum orci sit amet tristique. Ut et ipsum quam. Nulla viverra pulvinar ex nec mattis. Aenean sed laoreet justo. Morbi vulputate in turpis a ultricies. Aenean efficitur placerat quam sed posuere. Nulla sit amet est eget nisi accumsan pharetra. Etiam vitae mi at nisi euismod varius. Integer dapibus ex ante, id ornare nibh aliquet vel.

              Mauris sapien tortor, convallis nec venenatis sed, auctor vitae mauris. Fusce vel metus sed sapien ullamcorper consequat. Nulla facilisi. Etiam ut egestas nulla. Nunc ut velit enim. Etiam eget condimentum tellus. Fusce lacinia justo dolor, quis posuere dui maximus non. Nunc porta eros eget congue finibus. Nullam dui leo, varius vel enim et, elementum rutrum augue. Aliquam congue in nulla eget commodo. Curabitur ac rhoncus ex, blandit dapibus nisl. Integer sed tempor nisl.

              Pellentesque non eros eu mauris sodales bibendum. Donec nec lectus vel purus condimentum lobortis. Cras lacinia accumsan consectetur. Curabitur ipsum augue, ultrices sit amet posuere a, facilisis quis urna. Pellentesque felis est, aliquam in arcu quis, feugiat blandit mi. Aliquam at tortor dolor. Integer tristique mattis erat id imperdiet. Vivamus semper nisi nec purus faucibus, vitae dignissim ante euismod. Maecenas non quam felis. Sed commodo volutpat felis at cursus.</h2>
          </div>
        </container>
      </div>
    </div>

  )
}

export default Testing