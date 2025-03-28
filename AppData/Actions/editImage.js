const { Jimp, JimpMime } = require('jimp');

let boilerplate = (name) => {
  return {
    name: name,
    data: {},
    UI: [
      {
        element: "text",
        text: "This Filter Has No Options"
      }
    ]
  }
}

let plate = (name, data, UI, preview) => {
  return {
    name,
    data: data || {},
    UI,
    preview
  }
}

module.exports = {
  data: {
    name: "Edit Image",
  },
  category: "Images",
  UI: [
    {
      element: "image",
      storeAs: "image"
    },
    "-",
    {
      element: "menu",
      storeAs: "filters",
      name: "Filters",
      max: 50,
      types: {
        writeText: "Write Text",
        crop: "Crop",
        resize: "Resize",
        rotate: "Rotate",
        flipX: "Flip X",
        flipY: "Flip Y",
        greyscale: "Greyscale",
        opaque: "Opaque",
        contrast: "Contrast",
        background: "Set Background",
        brightness: "Brightness",
        invert: "Invert",
        dither: "16-Bit Dither",
        blur: "Blur",
        gaussian: "Gaussian Blur",
        sepia: "Sepia",
        posterize: "Posterize",
        pixelate: "Pixelate",
        mask: "Mask",
        composite: "Composite",
        replaceColor: "Replace Color"
      },
      UItypes: {
        writeText: plate("Write Text", { size: "100", color: "#000000", x: "0", y: "0", alignment: { type: 'center', value: '' } }, [
          {
            element: "input",
            name: "Text",
            storeAs: "text"
          },
          "_",
          {
            element: "inputGroup",
            nameSchemes: ["Size", "Color"],
            storeAs: ["size", "color"],
            placeholder: ["Number", "HEX Code"]
          },
          "_",
          {
            element: "menu",
            name: "Custom Font",
            storeAs: "font",
            max: 1,
            types: {
              font: "Custom Font"
            },
            UItypes: {
              font: {
                name: "Custom Font",
                data: { weight: "400" },
                preview: "",
                UI: [
                  {
                    element: "input",
                    name: "TrueType Font File",
                    storeAs: "file",
                    placeholder: "font.ttf"
                  },
                  {
                    element: "input",
                    name: "Family Name",
                    storeAs: "family",
                    placeholder: "Calibri"
                  },
                  {
                    element: "text",
                    text: `
                    Make sure the file name is identical to the font's name. You can double click a font to check.
                    `
                  },
                  "-",
                  {
                    element: "input",
                    name: "Weight",
                    storeAs: "weight",
                    placeholder: "Number"
                  }
                ]
              }
            }
          },
          "-",
          {
            element: "inputGroup",
            nameSchemes: ["X Coordinates", "Y Coordinates"],
            storeAs: ["x", "y"],
            placeholder: ["Number", "Number"]
          },
          "_",
          {
            element: "typedDropdown",
            name: "Alignment",
            storeAs: "alignment",
            choices: {
              center: { name: "Center" },
              left: { name: "Left" },
              right: { name: "Right" },
              end: { name: "End" },
              start: { name: "Start" }
            }
          }
        ]),
        greyscale: boilerplate("Greyscale"),
        sepia: boilerplate("Sepia"),
        opaque: boilerplate("Opaque"),
        flipX: boilerplate("Flip X"),
        flipY: boilerplate("Flip Y"),
        dither: boilerplate("16-Bit Dither"),
        invert: boilerplate("Invert"),
        replaceColor: plate("Replace Color", { replace: "#000000", replaceWith: "#FFFFFF" }, [
          {
            element: "input",
            name: "Color To Replace",
            storeAs: "replace",
            placeholder: "HEX Code"
          },
          "-",
          {
            element: "input",
            name: "Color To Replace With",
            storeAs: "replaceWith",
            placeholder: "HEX Code"
          },
          "-",
          {
            element: "input",
            name: "Delta",
            storeAs: "delta",
            placeholder: "0"
          }
        ]),
        contrast: plate("Contrast", { change: 100 }, [
          {
            name: "New Contrast Value",
            storeAs: "change",
            element: "input"
          },
          "_",
          {
            element: "text",
            text: "Minimum: 0<br> Maximum: 200"
          }
        ], "`New Contrast Value: ${option.data.change}`"),
        brightness: plate("Brightness", { change: 100 }, [
          {
            name: "New Brightness Value",
            storeAs: "change",
            element: "input"
          },
          "_",
          {
            element: "text",
            text: "Minimum: 0<br> Maximum: 200"
          }
        ], "`New Brightness Value: ${option.data.change}`"),
        mask: plate("Mask", { x: "0", y: "0" }, [
          {
            element: "image",
            name: "Mask",
            storeAs: "image"
          },
          "-",
          {
            element: "inputGroup",
            storeAs: ["x", "y"],
            nameSchemes: ["Mask X Coordinates", "Mask Y Coordinates"]
          }
        ]),
        composite: plate("Composite", { x: "0", y: "0" }, [
          {
            element: "image",
            name: "Composite",
            storeAs: "image"
          },
          "-",
          {
            element: "inputGroup",
            storeAs: ["x", "y"],
            nameSchemes: ["Composite X Coordinates", "Composite Y Coordinates"]
          }
        ]),
        background: plate("Background", {}, [
          {
            element: "image",
            name: "Background",
            storeAs: "image"
          },
        ]),
        blur: plate("Blur", { blur: '1' }, [
          {
            element: "input",
            name: "Blur Amount",
            storeAs: "blur"
          },
          "_",
          {
            element: "text",
            text: "Minimum: 0<br> Maximum: 100"
          }
        ], "`Blur Amount: ${option.data.blur}`"),
        gaussian: plate("Gaussian Blur", { blur: '1' }, [
          {
            element: "input",
            name: "Blur Amount",
            storeAs: "blur"
          },
          "_",
          {
            element: "text",
            text: "Minimum: 0<br> Maximum: 100"
          }
        ], "`Blur Amount: ${option.data.blur}`"),
        posterize: plate("Posterize", { amount: "10" }, [
          {
            element: "input",
            name: "Amount",
            storeAs: "amount"
          }
        ], "`Amount: ${option.data.amount}`"),
        rotate: plate("Rotate", { degrees: "45" }, [
          {
            element: "input",
            name: "Degrees",
            storeAs: "amount",
          },
        ], "`Rotate To ${option.data.amount} Degrees`"),
        crop: plate("Crop", { x: "", y: "", w: "", h: "" }, [
          {
            element: "input",
            name: "X Crop",
            storeAs: "x"
          },
          "_",
          {
            element: "input",
            name: "Y Crop",
            storeAs: "y"
          },
          "-",
          {
            element: "input",
            name: "Width Crop",
            storeAs: "w"
          },
          "_",
          {
            element: "input",
            name: "Height Crop",
            storeAs: "h"
          }
        ]),
        resize: plate("Resize", {}, [
          {
            element: "input",
            storeAs: "w",
            name: "New Width"
          },
          "-",
          {
            element: "input",
            storeAs: "h",
            name: "New Height"
          }
        ]),
        pixelate: plate("Pixelate", {}, [
          {
            name: "Pixelation Amount",
            storeAs: "amount",
            element: "input"
          },
          "_",
          {
            element: "text",
            text: "Minimum: 0<br> Maximum: 100"
          }
        ])
      }
    },
    "-",
    {
      element: "store",
      storeAs: "store"
    }
  ],
  subtitle: (data, constants) => {
    return `${data.filters.length} Effects`
  },
  compatibility: ["Any"],
  async run(values, message, client, bridge) {
    /**
     * @type {Uint8Array}
     */

    let img = await bridge.getImage(values.image);
    let t = bridge.transf;

    const _jimp = require('jimp');
    const jimp = _jimp.Jimp;
    const { loadFont } = _jimp;

    let image = await jimp.read(img);

    await new Promise(async (res) => {
      for (let ind = 0; ind < values.filters.length; ind++) {
        let baseFilter = values.filters[ind];
        let type = baseFilter.type;
        let filter = baseFilter.data;

        switch (type) {
          case 'writeText':
            const { createCanvas, loadImage, registerFont } = require('canvas')
            let fontFamily = `Calibri`;
            if (filter.font[0]) {
              fontFamily = t(filter.font[0].data.family);
              await registerFont(bridge.file(filter.font[0].data.file), {
                family: fontFamily,
                weight: Number(bridge.transf(filter.font[0].data.weight))
              });
            }
            const canvas = createCanvas(image.width, image.height);
            const ctx = canvas.getContext('2d');
            var tempImage = await image.getBuffer(JimpMime.png);
            tempImage = await loadImage(tempImage);
            ctx.drawImage(tempImage, 0, 0);
            ctx.font = `${t(filter.size)}px ${fontFamily}`;
            ctx.fillStyle = bridge.transf(filter.color);
            ctx.textAlign = filter.alignment.type;

            ctx.fillText(bridge.transf(filter.text), Number(t(filter.x)), Number(t(filter.y)));

            var buffer = Buffer.concat(await canvas.createPNGStream().toArray());
            image = await jimp.read(buffer);
            break
          case 'crop':
            await image.crop(Number(t(filter.x)), Number(t(filter.y)), Number(t(filter.h)), Number(t(filter.w)));
            break;
          case 'resize':
            await image.resize({
              w: Number(t(filter.w)),
              h: Number(t(filter.h))
            });
            break;
          case 'rotate':
            await image.rotate(Number(t(filter.amount)));
            break;
          case 'gaussian':
            await image.gaussian(Number(t(filter.blur)));
            break;
          case 'blur':
            await image.blur(Number(t(filter.blur)));
            break;
          case 'flipX':
            await image.flip(false, true);
            break;
          case 'flipY':
            await image.flip(true, false);
            break;
          case 'greyscale':
            await image.greyscale();
            break;
          case 'opaque':
            await image.opaque();
            break;
          case 'contrast':
            await image.contrast(Number(t(filter.amount)));
            break;
          case 'brightness':
            await image.brightness(Number(t(filter.amount)));
            break;
          case 'pixelate':
            await image.pixelate(Number(t(filter.amount)));
            break;
          case 'posterize':
            await image.posterize(Number(t(filter.amount)));
            break;
          case 'mask':
            let imgToRead = await bridge.getImage(filter.image);
            let mask = await jimp.read(imgToRead);
            await image.mask(mask, Number(t(filter.x)), Number(t(filter.y)));
            break;
          case 'composite':
            let imgToGet = await bridge.getImage(filter.image);
            let composite = await jimp.read(imgToGet);
            await image.composite(composite, Number(t(filter.x)), Number(t(filter.y)));
            break;
          case 'background':
            let imgToBackground = await bridge.getImage(filter.image);
            let background = await jimp.read(imgToBackground);
            await image.composite(background, 0, 0, { opacityDest: 0 });
            break;
          case 'replaceColor':
            const replaceColor = require('replace-color');
            let imageToReplace = await image.getBuffer(JimpMime.png);
            await new Promise(resolve => {
              replaceColor({
                image: imageToReplace,
                deltaE: Number(t(filter.delta)),
                colors: {
                  type: 'hex',
                  targetColor: t(filter.replace),
                  replaceColor: t(filter.replaceWith)
                }
              }).then(async replacedImage => {
                image = await replacedImage.getBufferAsync(JimpMime.png);
                image = await jimp.read(image);
                resolve();
              });
            });
            await imageToReplace;
            break;
          case 'dither':
            await image.dither();
            break;
          case 'invert':
            await image.invert();
            break;
          case 'sepia':
            await image.sepia();
            break;
        }
      }
      res();
    });

    let imageBuffer = await image.getBuffer(JimpMime.png);

    bridge.store(values.store, imageBuffer);
  },
};
