/** plopfile.js */
module.exports = function (plop) {
  plop.setGenerator('viewmodel', {
    description: 'Crea un nuevo ViewModel MVVM',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nombre del ViewModel (sin "ViewModel")',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/viewmodels/{{pascalCase name}}ViewModel.ts',
        templateFile: 'plop-templates/viewmodel.hbs',
      },
    ],
  });

  plop.setGenerator('view', {
    description: 'Crea una nueva View',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Nombre de la View',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/views/{{pascalCase name}}View.tsx',
        templateFile: 'plop-templates/view.hbs',
      },
    ],
  });
};