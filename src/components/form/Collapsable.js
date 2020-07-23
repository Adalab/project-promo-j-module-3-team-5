import React from 'react';

class Collapsable extends React.Component {
  render() {
    return (
      <form className="form" action="" method="post">
        <div className="wrapper">
          <div className="design">
            {/* <!--       DESIGN      --> */}
            <div className="container__design">
              {/* <!-- Collapsable parent: DESIGN title --> */}
              <div className="container__design--title js-collapsibleParent">
                <i className="main__menu-icon far fa-object-ungroup"></i>
                <h3>Diseña</h3>
                <i className="arrow fas fa-chevron-down"></i>
              </div>
              {/* <!-- Collapsable child: PALETTES --> */}
              <div className="palettes__container js-collapsibleChild hide-design">
                <span>Colores</span>
                <div className="palettes__options">
                  <div className="option option1">
                    <label for="palette1">
                      <input
                        type="radio"
                        className="palette"
                        id="palette1"
                        value="1"
                        name="palette"
                        required
                        checked
                      />
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                    </label>
                  </div>
                  <div className="option option2">
                    <label for="palette2">
                      <input
                        type="radio"
                        className="palette"
                        id="palette2"
                        value="2"
                        name="palette"
                        required
                      />
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                    </label>
                  </div>
                  <div className="option option3">
                    <label for="palette3">
                      <input
                        type="radio"
                        className="palette"
                        id="palette3"
                        value="3"
                        name="palette"
                        required
                      />
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                    </label>
                  </div>
                  <div className="option option4">
                    <label for="palette4">
                      <input
                        type="radio"
                        className="palette"
                        id="palette4"
                        value="4"
                        name="palette"
                        required
                      />
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                      <div className="palette__color"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!--       FILL        --> */}
          <div className="fill">
            <div className="container__fill">
              <div className="container__fill--title js-collapsibleParent">
                <i className="main__menu-icon far fa-keyboard"></i>
                <h3>Rellena</h3>
                <i className="arrow fas fa-chevron-down"></i>
              </div>

              <div className="fill-box js-collapsibleChild hide-fill">
                <label for="name">Nombre completo</label>
                <input
                  type="text"
                  placeholder="Ej: Tentáculo Morado"
                  id="name"
                  name="name"
                  required
                />
                <label for="job">Puesto</label>
                <input
                  type="text"
                  placeholder="Ej: Front-end unicorn "
                  id="job"
                  name="job"
                  required
                />
                <label for="img-selector">Imagen de perfil</label>
                {/* <!-- De aquí --> */}
                <div className="action__image-preview">
                  <div className="action">
                    <button
                      className="action__upload-btn js__profile-trigger btn-addimage"
                      type="button"
                    >
                      Añadir imagen
                    </button>
                    <input
                      type="file"
                      name=""
                      id="img-selector"
                      className="action__hiddenField js__profile-upload-btn"
                    />
                  </div>
                  <div className="profile">
                    {/* <!--btn-container --> */}
                    <div
                      className="profile__image js__profile-image"
                      style={{
                        backgroundImage: `url(https://via.placeholder.com/300x300/cccccc/666666/?text=IMAGE)`,
                      }}
                    ></div>
                    <div className="profile__preview js__profile-preview"></div>
                  </div>
                </div>

                {/* <!-- Aquí --> */}

                <label for="email">Email</label>
                <input
                  className="email"
                  type="email"
                  placeholder="Ej: tentaculo@morado.com"
                  id="email"
                  name="email"
                  pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                  required
                />

                <label for="phone">Teléfono</label>
                <input
                  className="phone"
                  type="tel"
                  placeholder="Ej: 690902412"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{9}"
                />

                <label for="linkedin">Linkedin</label>
                <input
                  type="text"
                  placeholder="Ej: tentaculus"
                  id="linkedin"
                  name="linkedin"
                  pattern="[A-Za-z0-9]+"
                  required
                />

                <label for="github">Github</label>
                <input
                  type="text"
                  placeholder="Ej: codingtentacle"
                  id="github"
                  name="github"
                  pattern="[A-Za-z0-9-]+"
                  required
                />
              </div>
            </div>
          </div>

          {/* <!--       SHARE      --> */}

          <div className="share">
            <div className="share__container">
              <div className="share__container--title js-collapsibleParent">
                <i className="fa fa-share-alt" aria-hidden="true"></i>
                <h3>Comparte</h3>
                <i className="arrow fas fa-chevron-down"></i>
              </div>
              <div className="share__container--button js-collapsibleChild hide-share">
                <button
                  type="button"
                  className="button__card btn--disable"
                  href=""
                  title="Crear tarjeta"
                  disabled
                >
                  <i className="i__card far fa-address-card"></i>CREAR TARJETA
                </button>
              </div>
            </div>
          </div>
          <div className="carddone js-carddone hidden">
            <h3>La tarjeta ha sido creada</h3>
            <a className="link__card" href="./" title="Enlace de la tarjeta">
              http://www.loquesea.com
            </a>
            <a
              className="button__twitter"
              href="./"
              title="Compartir en Twitter"
              target="_blank"
            >
              <i className="twitter-icon fab fa-twitter"></i>Compartir en
              twitter
            </a>
          </div>
        </div>
      </form>
    );
  }
}
export default Collapsable;
