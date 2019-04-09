import mergeDirs from 'merge-dirs';
import path from 'path';
import { getVersion, getPackageJson, writePackageJson } from '../../lib/helpers';

export default async npmOptions => {
  const storybookVersion = await getVersion(npmOptions, '@storybook/aurelia');

  mergeDirs(path.resolve(__dirname, 'template/'), '.', 'overwrite');

  const packageJson = getPackageJson();

  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencies = packageJson.devDependencies || {};
  packageJson.devDependencies['@storybook/aurelia'] = storybookVersion;

  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.storybook = 'start-storybook -p 6006';
  packageJson.scripts['build-storybook'] = 'build-storybook';

  writePackageJson(packageJson);
};
