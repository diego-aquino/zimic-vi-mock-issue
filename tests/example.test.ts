import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import renderApp, { GitHubRepository } from '../src/app';
import githubInterceptor from './interceptors/github';

import './setup';

vi.mock('./mock');

describe('Example tests', () => {
  const ownerName = 'owner';
  const repositoryName = 'example';

  const repository: GitHubRepository = {
    id: 1,
    full_name: `${ownerName}/${repositoryName}`,
    html_url: `https://github.com/${ownerName}/${repositoryName}`,
  };

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render a GitHub repository, if found', async () => {
    githubInterceptor
      .get(`/repos/${ownerName}/${repositoryName}`)
      .respond({
        status: 200,
        body: repository,
      })
      .times(1);

    renderApp();

    const ownerInput = screen.getByRole('textbox', { name: 'Owner' });
    await userEvent.type(ownerInput, ownerName);

    const repositoryInput = screen.getByRole('textbox', { name: 'Repository' });
    await userEvent.type(repositoryInput, repositoryName);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    await userEvent.click(searchButton);

    const repositoryHeading = await screen.findByRole('heading', { name: repository.full_name });
    expect(repositoryHeading).toBeInTheDocument();

    const repositoryLink = await screen.findByRole('link', { name: repository.html_url });
    expect(repositoryLink).toBeInTheDocument();
  });
});