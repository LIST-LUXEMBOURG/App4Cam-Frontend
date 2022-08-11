import { createTestingPinia } from '@pinia/testing'
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import {
  ClosePopup,
  QAvatar,
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QItem,
  QItemLabel,
  QItemSection,
  Ripple,
} from 'quasar'
import { files } from '../../fixtures/files.json'
import ApiClientService from '../helpers/ApiClientService'
import { convertJsonToFiles } from '../test-helpers'
import ShotsView from './ShotsView.vue'

const mockFiles = convertJsonToFiles(files)

jest.mock('../config', () => ({ CONFIG: { API_SERVER_URL: '' } }))

jest.spyOn(ApiClientService, 'getFileList').mockResolvedValue(mockFiles)

let wrapper: VueWrapper

beforeEach(() => {
  wrapper = mount(ShotsView, {
    components: {
      'q-avatar': QAvatar,
      'q-btn': QBtn,
      'q-card': QCard,
      'q-card-actions': QCardActions,
      'q-card-section': QCardSection,
      'q-dialog': QDialog,
      'q-item': QItem,
      'q-item-label': QItemLabel,
      'q-item-section': QItemSection,
    },
    directives: {
      ClosePopup,
      Ripple,
    },
    global: {
      plugins: [
        createTestingPinia({
          stubActions: false,
        }),
      ],
      provide: {
        _q_: undefined,
      },
      stubs: {
        'q-select': {
          template: '<i />',
        },
      },
    },
  })
})

describe('display', () => {
  it.skip('displays files in a list with the necessary information', () => {
    const files = wrapper.findAll('[data-test-id="file"]')
    expect(files).toHaveLength(mockFiles.length)
    files.forEach((file, i) => {
      const fileText = file.text()
      expect(fileText).toContain(mockFiles[i].name)
      expect(fileText).toContain(
        mockFiles[i].creationTime.getUTCFullYear().toString(),
      )
    })
  })
})

describe('selection', () => {
  const backgroundClass = 'bg-blue-1'

  it.skip('toggles active state', async () => {
    const files = wrapper.findAll('[data-test-id="file"]')
    expect(files[0].classes()).not.toContain(backgroundClass)
    await files[0].trigger('click')
    expect(files[0].classes()).toContain(backgroundClass)
    await files[0].trigger('click')
    expect(files[0].classes()).not.toContain(backgroundClass)
  })
})

describe('select all button', () => {
  let selectAllButton: DOMWrapper<Element>

  beforeEach(() => {
    selectAllButton = wrapper.find('[data-test-id="select-all-button"]')
  })

  it.skip('is not disabled initially', async () => {
    expect(selectAllButton.element.hasAttribute('disabled')).toBeFalsy()
  })

  it.skip('is not disabled after selecting on file', async () => {
    const files = wrapper.findAll('[data-test-id="file"]')
    await files[0].trigger('click')
    expect(selectAllButton.element.hasAttribute('disabled')).toBeFalsy()
  })

  it.skip('is disabled after selecting all', async () => {
    await selectAllButton.trigger('click')
    expect(selectAllButton.element.hasAttribute('disabled')).toBeTruthy()
  })
})

describe('unselect all button', () => {
  let unselectAllButton: DOMWrapper<Element>
  let files: DOMWrapper<Element>[]

  beforeEach(() => {
    files = wrapper.findAll('[data-test-id="file"]')
    unselectAllButton = wrapper.find('[data-test-id="unselect-all-button"]')
  })

  it.skip('is disabled initially', async () => {
    expect(unselectAllButton.element.hasAttribute('disabled')).toBeTruthy()
  })

  it.skip('is not disabled after selecting on file', async () => {
    await files[0].trigger('click')
    expect(unselectAllButton.element.hasAttribute('disabled')).toBeFalsy()
  })

  it.skip('is disabled after unselecting all', async () => {
    await files[0].trigger('click')
    await unselectAllButton.trigger('click')
    expect(unselectAllButton.element.hasAttribute('disabled')).toBeTruthy()
  })
})

describe('download button', () => {
  it.skip('changes the download button disabled state depending on if a file is selected', async () => {
    const downloadButton = wrapper.find('[data-test-id="download-button"]')
    expect(downloadButton.element.hasAttribute('disabled')).toBeTruthy()
    const files = wrapper.findAll('[data-test-id="file"]')
    await files[0].trigger('click')
    expect(downloadButton.element.hasAttribute('disabled')).toBeFalsy()
    await files[0].trigger('click')
    expect(downloadButton.element.hasAttribute('disabled')).toBeTruthy()
  })
})

describe('delete button', () => {
  it.skip('changes the delete button disabled state depending on if a file is selected', async () => {
    const deleteButton = wrapper.find('[data-test-id="delete-button"]')
    expect(deleteButton.element.hasAttribute('disabled')).toBeTruthy()
    const files = wrapper.findAll('[data-test-id="file"]')
    await files[0].trigger('click')
    expect(deleteButton.element.hasAttribute('disabled')).toBeFalsy()
    await files[0].trigger('click')
    expect(deleteButton.element.hasAttribute('disabled')).toBeTruthy()
  })
})

afterEach(() => {
  wrapper.unmount()
})
