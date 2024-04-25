import { Notice, Plugin, PluginSettingTab } from "obsidian"

interface SnipdImporterSettings {}

const DEFAULT_SETTINGS: SnipdImporterSettings = {}

export default class SnipdImporterPlugin extends Plugin {
  settings: SnipdImporterSettings

  async onload() {
    await this.loadSettings()

    // This adds a settings tab so the user can configure various aspects of the plugin
    this.addSettingTab(new S3agleSettingTab(this.app, this))

    // Add command for uploading all linked local files in the current document to S3 and Eagle
    this.addCommand({
      id: "import-snipd-notes",
      name: "Import Snipd notes",
      callback: () => this.importSnipdNotes(),
    })
  }

  onunload() {}

  //Fetch the data from the plugin settings
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  //Save the plugin settings
  async saveSettings() {
    await this.saveData(this.settings)
  }

  importSnipdNotes() {
    new Notice("Not implemented yet")
  }
}

class S3agleSettingTab extends PluginSettingTab {
  plugin: SnipdImporterPlugin

  display() {
    const { containerEl } = this
    containerEl.empty()

    this.drawGeneralSettings(containerEl)
  }

  drawGeneralSettings(containerEl: HTMLElement) {}
}

const sanitizeFileName = (filename: string): string => {
  // Replace spaces with underscores and remove any problematic characters
  return filename
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^\w.-]/g, "") // Remove all non-word characters except dots and dashes
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Normalize diacritics
}
