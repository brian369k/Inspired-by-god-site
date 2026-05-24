// src/pages/ProductCustomizer.jsx

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import printProducts from '../data/printProducts'

export default function ProductCustomizer() {

  const DEV_MODE = true

  const PIXELS_PER_INCH = 20

  const { id } = useParams()

  const product =
    printProducts.find(
      item => item.id === id
    )

  /*
    =========================
    LOCKED PRESETS
    =========================
  */

  const FRONT_PRESET = {

    x: 50.25,
    y: 41.5,

    widthInches: 11.5,
    heightInches: 11.5
  }

  const LEFT_CHEST_PRESET = {

    x: 58.15,
    y: 28.9,

    widthInches: 3.5,
    heightInches: 3.25
  }

  const BACK_PRESET = {

    x: 50.25,
    y: 41.5,

    widthInches: 11.5,
    heightInches: 11.5
  }

  /*
    =========================
    STATES
    =========================
  */

  const [selectedColor, setSelectedColor] =
    useState(
      product.colors[0]
    )

  const [uploadedLogo, setUploadedLogo] =
    useState(null)

  const [activePreset, setActivePreset] =
    useState('front')

  /*
    =========================
    SHIRT IMAGE
    =========================
  */

  const currentShirtImage =
    activePreset === 'back'
      ? selectedColor.backImage
      : selectedColor.image

  /*
    =========================
    PIXEL SIZES
    =========================
  */

  const frontWidthPx =
    FRONT_PRESET.widthInches *
    PIXELS_PER_INCH

  const frontHeightPx =
    FRONT_PRESET.heightInches *
    PIXELS_PER_INCH

  const chestWidthPx =
    LEFT_CHEST_PRESET.widthInches *
    PIXELS_PER_INCH

  const chestHeightPx =
    LEFT_CHEST_PRESET.heightInches *
    PIXELS_PER_INCH

  const backWidthPx =
    BACK_PRESET.widthInches *
    PIXELS_PER_INCH

  const backHeightPx =
    BACK_PRESET.heightInches *
    PIXELS_PER_INCH

  /*
    =========================
    REMOVE WHITE BACKGROUND
    =========================
  */

  const removeWhiteBackground = (src) => {

    return new Promise((resolve) => {

      const img = new Image()

      img.onload = () => {

        const canvas =
          document.createElement('canvas')

        const ctx =
          canvas.getContext('2d')

        canvas.width =
          img.width

        canvas.height =
          img.height

        ctx.drawImage(
          img,
          0,
          0
        )

        const imageData =
          ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          )

        const data =
          imageData.data

        for (
          let i = 0;
          i < data.length;
          i += 4
        ) {

          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]

          if (

            r > 240 &&
            g > 240 &&
            b > 240

          ) {

            data[i + 3] = 0
          }
        }

        ctx.putImageData(
          imageData,
          0,
          0
        )

        resolve(
          canvas.toDataURL('image/png')
        )
      }

      img.src = src
    })
  }

  /*
    =========================
    UPLOAD
    =========================
  */

  const handleUpload = (e) => {

    const file =
      e.target.files[0]

    if (!file) return

    const reader =
      new FileReader()

    reader.onload = async () => {

      const transparent =
        await removeWhiteBackground(
          reader.result
        )

      setUploadedLogo(
        transparent
      )
    }

    reader.readAsDataURL(file)
  }

  /*
    =========================
    SWITCH PRESET
    =========================
  */

  const setPreset = (type) => {

    setActivePreset(type)
  }

  /*
    =========================
    REMOVE
    =========================
  */

  const removeLogo = () => {

    setUploadedLogo(null)
  }

  /*
    =========================
    EXPORT
    =========================
  */

  const exportMockup = async () => {

    const canvas =
      document.createElement('canvas')

    canvas.width = 2000
    canvas.height = 2000

    const ctx =
      canvas.getContext('2d')

    /*
      BACKGROUND
    */

    ctx.fillStyle = '#e9e9e9'

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    )

    /*
      LOAD SHIRT
    */

    const shirt =
      new Image()

    shirt.crossOrigin =
      'anonymous'

    shirt.src =
      currentShirtImage

    await new Promise(
      (resolve) => {

        shirt.onload = resolve
      }
    )

    /*
      DRAW SHIRT
    */

    const shirtWidth = 1200
    const shirtHeight = 1200

    const shirtX =
      (canvas.width - shirtWidth) / 2

    const shirtY = 180

    ctx.drawImage(

      shirt,

      shirtX,
      shirtY,

      shirtWidth,
      shirtHeight
    )

    /*
      DRAW LOGO
    */

    if (uploadedLogo) {

      const logo =
        new Image()

      logo.src =
        uploadedLogo

      await new Promise(
        (resolve) => {

          logo.onload = resolve
        }
      )

      let boxWidth = 0
      let boxHeight = 0
      let boxX = 0
      let boxY = 0

      /*
        FRONT
      */

      if (activePreset === 'front') {

        boxWidth = 460
        boxHeight = 460

        boxX = 770
        boxY = 520
      }

      /*
        LEFT CHEST
      */

      if (activePreset === 'left-chest') {

        boxWidth = 150
        boxHeight = 150

        boxX = 930
        boxY = 430
      }

      /*
        BACK
      */

      if (activePreset === 'back') {

        boxWidth = 460
        boxHeight = 460

        boxX = 770
        boxY = 520
      }

      /*
        SCALE
      */

      const logoRatio =
        logo.width / logo.height

      let drawWidth =
        boxWidth

      let drawHeight =
        drawWidth / logoRatio

      if (drawHeight > boxHeight) {

        drawHeight =
          boxHeight

        drawWidth =
          drawHeight * logoRatio
      }

      /*
        CENTER
      */

      const drawX =
        boxX +
        (boxWidth - drawWidth) / 2

      const drawY =
        boxY

      /*
        DRAW
      */

      ctx.drawImage(

        logo,

        drawX,
        drawY,

        drawWidth,
        drawHeight
      )

      /*
        DEV BOX
      */

      if (DEV_MODE) {

        ctx.strokeStyle = 'red'

        ctx.lineWidth = 3

        ctx.strokeRect(

          boxX,
          boxY,

          boxWidth,
          boxHeight
        )
      }
    }

    /*
      EXPORT
    */

    const image =
      canvas.toDataURL(
        'image/png'
      )

    const link =
      document.createElement('a')

    link.href =
      image

    link.download =
      `mockup-${activePreset}.png`

    link.click()
  }

  return (

    <div className="min-h-screen bg-black pt-[72px] overflow-hidden">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="fixed top-0 left-0 w-full z-50 bg-black border-b border-[#1d1d1d]">

        <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* LOGO */}

          <a
            href="/"
            className="text-white font-black text-2xl tracking-tight"
          >
            INSPIRED
            <span className="text-yellow-500">
              BYGOD
            </span>
          </a>

          {/* MENU */}

          <nav className="hidden md:flex items-center gap-8">

            <a
              href="/"
              className="text-sm font-bold text-white hover:text-yellow-500 transition"
            >
              HOME
            </a>

            <a
              href="/shop"
              className="text-sm font-bold text-white hover:text-yellow-500 transition"
            >
              SHOP
            </a>

            <a
              href="/customize"
              className="text-sm font-bold text-white hover:text-yellow-500 transition"
            >
              CUSTOMIZE
            </a>

            <a
              href="/hats"
              className="text-sm font-bold text-white hover:text-yellow-500 transition"
            >
              HATS
            </a>

            <a
              href="/contact"
              className="text-sm font-bold text-white hover:text-yellow-500 transition"
            >
              CONTACT
            </a>

          </nav>

          {/* BUTTON */}

          <a
            href="/customize"
            className="bg-yellow-500 hover:bg-yellow-400 transition text-black text-xs font-black px-5 py-3 rounded-xl"
          >
            START DESIGNING
          </a>

        </div>

      </header>

      {/* =========================
          PAGE CONTENT
      ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[65%_35%] h-[calc(100vh-72px)]">

        {/* MOCKUP */}

        <div className="bg-[#e9e9e9] flex items-center justify-center relative p-10 w-full h-full overflow-hidden">

          {/* SHIRT */}

          <img
            src={currentShirtImage}
            alt="product"
            className="w-full max-w-[700px] max-h-[88vh] object-contain"
            draggable={false}
          />

          {/* FRONT */}

          {activePreset === 'front' && (

            <div
              className="absolute flex items-start justify-center"
              style={{

                width:
                  `${frontWidthPx}px`,

                height:
                  `${frontHeightPx}px`,

                top:
                  `${FRONT_PRESET.y}%`,

                left:
                  `${FRONT_PRESET.x}%`,

                transform:
                  'translate(-50%, -50%)',

                overflow: 'hidden',

                border:
                  DEV_MODE
                    ? '2px solid red'
                    : 'none'
              }}
            >

              {uploadedLogo && (

                <img
                  src={uploadedLogo}
                  alt="logo"
                  draggable={false}
                  style={{

                    width: '100%',

                    height: '100%',

                    objectFit: 'contain',

                    objectPosition: 'top center',

                    display: 'block'
                  }}
                />

              )}

            </div>

          )}

          {/* LEFT CHEST */}

          {activePreset === 'left-chest' && (

            <div
              className="absolute flex items-start justify-center"
              style={{

                width:
                  `${chestWidthPx}px`,

                height:
                  `${chestHeightPx}px`,

                top:
                  `${LEFT_CHEST_PRESET.y}%`,

                left:
                  `${LEFT_CHEST_PRESET.x}%`,

                transform:
                  'translate(-50%, -50%)',

                overflow: 'hidden',

                border:
                  DEV_MODE
                    ? '2px solid red'
                    : 'none'
              }}
            >

              {uploadedLogo && (

                <img
                  src={uploadedLogo}
                  alt="logo"
                  draggable={false}
                  style={{

                    width: '100%',

                    height: '100%',

                    objectFit: 'contain',

                    objectPosition: 'top center',

                    display: 'block'
                  }}
                />

              )}

            </div>

          )}

          {/* BACK */}

          {activePreset === 'back' && (

            <div
              className="absolute flex items-start justify-center"
              style={{

                width:
                  `${backWidthPx}px`,

                height:
                  `${backHeightPx}px`,

                top:
                  `${BACK_PRESET.y}%`,

                left:
                  `${BACK_PRESET.x}%`,

                transform:
                  'translate(-50%, -50%)',

                overflow: 'hidden',

                border:
                  DEV_MODE
                    ? '2px solid red'
                    : 'none'
              }}
            >

              {uploadedLogo && (

                <img
                  src={uploadedLogo}
                  alt="logo"
                  draggable={false}
                  style={{

                    width: '100%',

                    height: '100%',

                    objectFit: 'contain',

                    objectPosition: 'top center',

                    display: 'block'
                  }}
                />

              )}

            </div>

          )}

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-black border-l border-[#1d1d1d] flex flex-col h-full overflow-y-auto">

          <div className="border-b border-[#1d1d1d] p-6">

            <p className="text-yellow-500 text-[10px] tracking-[0.3em] uppercase mb-2">
              Inspired By God
            </p>

            <h1 className="text-4xl font-black">
              {product.name}
            </h1>

          </div>

          <div className="p-6 space-y-6">

            {/* COLORS */}

            <div>

              <h2 className="text-sm font-black mb-4">
                Shirt Colors
              </h2>

              <div className="grid grid-cols-2 gap-3">

                {product.colors.map(
                  (color) => (

                    <button
                      key={color.name}
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      className={`p-4 rounded-xl text-xs font-black capitalize ${
                        selectedColor.name ===
                        color.name
                          ? 'bg-yellow-500 text-black'
                          : 'bg-[#111] border border-[#222]'
                      }`}
                    >
                      {color.name}
                    </button>

                  )
                )}

              </div>

            </div>

            {/* PLACEMENT */}

            <div>

              <h2 className="text-sm font-black mb-4">
                Placement
              </h2>

              <div className="grid grid-cols-1 gap-3">

                {[
                  'front',
                  'left-chest',
                  'back'
                ].map((item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setPreset(item)
                    }
                    className={`p-4 rounded-xl text-xs font-black ${
                      activePreset === item
                        ? 'bg-yellow-500 text-black'
                        : 'bg-[#111] border border-[#222]'
                  }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            {/* UPLOAD */}

            <div>

              <h2 className="text-sm font-black mb-4">
                Upload Logo
              </h2>

              <input
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleUpload}
                className="w-full bg-[#111] border border-[#222] rounded-xl p-4 text-sm"
              />

            </div>

            {/* ACTIONS */}

            {uploadedLogo && (

              <>

                <button
                  onClick={removeLogo}
                  className="w-full border border-red-500 text-red-500 py-4 rounded-xl text-xs font-black"
                >
                  REMOVE LOGO
                </button>

                <button
                  onClick={exportMockup}
                  className="w-full bg-white text-black py-4 rounded-xl text-xs font-black"
                >
                  EXPORT MOCKUP
                </button>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  )
}