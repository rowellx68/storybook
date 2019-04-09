import { document } from 'global';
import { stripIndents } from 'common-tags';

import { bootstrap } from 'aurelia-bootstrapper';

export default function render({ storyFn, selectedKind, selectedStory, showMain, showError }) {
  const element = storyFn();

  if (!element) {
    showError({
      title: `Expecting a Aurelia component from the story: "${selectedStory}" of "${selectedKind}".`,
      description: stripIndents`
        Did you forget to return the Aurelia component from the story?
        Use "() => ({ template: '<my-component></my-component>' })" when defining the story.
      `,
    });
  }

  const host = document.getElementById('root');

  showMain();

  bootstrap(au => {
    au.use
      .standardConfiguration()
      .developmentLogging()
      .start()
      .then(() => au.setRoot(element, host));
  });
}
