const fs = require('fs');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminGm = require('imagemin-gm');
const imageminGm = new ImageminGm();

// Null because we want to keep the original size too
const sizes = [null, 600, 1000, 1600];

const setPlugins = size => {
  if (size) {
    return [
      imageminGm.resize({ width: size, }),
      imageminGm.convert('jpg'),
      imageminMozjpeg({ quality: 50 })
    ]
  }

  return [
    imageminGm.convert('jpg'),
    imageminMozjpeg({ quality: 50 })
  ]
}

const pipeline = sizes.forEach(async (size, index) => {
  const files = await imagemin(
    ['batch/*.jpeg', 'batch/*.jpg'],
    'img',
    { plugins: setPlugins(size) }
  );

  files.map(file => {
    const label = size === null ? 'original' : size;
    console.log(file.path, `${label}`);
    // The last one can be renamed rather than copied otherwise we end up with two the same
    if (index === (sizes.length - 1)) {
      return fs.renameSync(
        file.path,
        file.path.replace('.', `-${label}.`)
          .replace('.jpeg', '.jpg')
      );
    }
    return fs.copyFileSync(
      file.path,
      file.path.replace('.', `-${label}.`)
      .replace('.jpeg', '.jpg')
    );
  });
});

module.exports = pipeline;
