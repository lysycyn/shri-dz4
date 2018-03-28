module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: './img/[name].[ext]',
          },
        },
        {
          test: /\.(ico)$/,
          loader: 'file-loader',
          options: {
            name: './[name].[ext]',
          },
        },
      ],
    },
  };
};
