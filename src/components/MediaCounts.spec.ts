// © 2022-2024 Luxembourg Institute of Science and Technology
import { createTestingPinia } from '@pinia/testing'
import { screen } from '@testing-library/vue'
import { StateTree } from 'pinia'
import { renderAsync } from '../../test/vitest/renderAsync'
import MediaCounts from './MediaCounts.vue'

const renderComponent = (initialState?: StateTree) =>
  renderAsync(MediaCounts, {
    global: {
      plugins: [createTestingPinia({ initialState })],
    },
  })

it('displays a heading', async () => {
  await renderComponent()
  const heading = screen.getByRole('heading', { name: 'Media' })
  expect(heading).toBeInTheDocument()
})

const mockFiles = [
  { name: 'a.jpg', creationTime: new Date() },
  { name: 'b.mp4', creationTime: new Date() },
  { name: 'c.jpg', creationTime: new Date() },
  { name: 'd.mp4', creationTime: new Date() },
  { name: 'e.mp4', creationTime: new Date() },
]

it('displays picture count', async () => {
  await renderComponent({
    files: {
      files: mockFiles,
    },
  })
  const pictures = screen.queryByText('Pictures: 2')
  expect(pictures).toBeInTheDocument()
})

it('displays video count', async () => {
  await renderComponent({
    files: {
      files: mockFiles,
    },
  })
  const videos = screen.queryByText('Videos: 3')
  expect(videos).toBeInTheDocument()
})
