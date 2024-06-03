module.exports = {
    extends: [
      "react-app",
      "react-app/jest",
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-undef": "off",
      "import/first": "off",
    },
    overrides: [
      {
        files: ["src/api/janus.js"],
        rules: {
          "no-undef": "off",
          "react-hooks/rules-of-hooks": "off",
          "react-hooks/exhaustive-deps": "off"
        }
      }
    ]
  };
  