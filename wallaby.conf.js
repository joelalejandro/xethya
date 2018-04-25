module.exports = function () {
  return {
    files: [
      'src/**/!(*.test).ts',
    ],

    tests: [
      'src/**/*.test.ts',
    ],

    env: {
      type: 'node',
      runner: 'node'  // or full path to any node executable
    }
  };
};
