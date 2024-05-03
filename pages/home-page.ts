import {Frame, FrameLocator, expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly locator1: Locator;
    readonly locator2: Locator;
    readonly locator3: Locator;
    readonly locator4: Locator;
    readonly locator5: Locator;
    readonly locator6: Locator;
    readonly locator7: Locator;
    readonly locator8: Locator;
    readonly locator9: Locator;
    readonly frame: Frame | null;
    readonly frameLocator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.locator1 = page.locator('#css');
        this.locator2 = page.getByRole('button', {name: 'login', disabled: false});
        this.locator3 = page.getByLabel('username');
        this.locator4 = page.locator('xpath');
        this.locator5 = page.getByPlaceholder('enter password');
        this.locator6 = page.getByTestId('qaid');
        this.locator7 = page.getByTitle('Title');
        this.locator8 = page.getByText('text');
        this.locator9 = page.getByAltText('altText');
        this.frame = page.frame('framexath/css');
        this.frameLocator = page.frameLocator('framelocator');

    }
    
    async goTo() {
        await this.page.goto('url');
    }

    async login() {
       await this.locator2.click();
       await this.locator3.fill('username');
       await this.locator5.fill('password');
       await this.page.locator('#submit').click();
       expect(this.page.title()).toBe('Logged in successfully');
    }

    async frameMethods() {
        const frame = this.frame;
        const locatorInFrame = this.frameLocator.locator(this.locator1);
    }

    async locatorActions() {
        await this.locator1.check();
        await this.locator1.uncheck();
        await this.locator1.hover();
        await this.locator1.focus();
        await this.locator1.pressSequentially('press');
        await this.locator1.clear();
        await this.locator1.dblclick();
        await this.locator1.scrollIntoViewIfNeeded();
        await this.locator1.screenshot();
        await this.locator1.press('key');

    }

    async dragAndDrop() {
        const source = this.locator1;
        const target = this.locator2;
        await source.dragTo(target);
    }

    async select() {
        const value: string[] = ['value1', 'value2'];
        //select by value
        await this.locator1.selectOption('value');
        //select by multiple values
        //value is array of values
        await this.locator1.selectOption(value);
        //select by visible text
        await this.locator1.selectOption({label: 'visisbletext'});
        //select by index
        await this.locator1.selectOption({index: 1});
    }

    async fileUploadAndDownloads() {
      //download
      const downloadPromise = this.page.waitForEvent('download');
      await this.page.locator('downloadLink').click();
      const download = await downloadPromise;
      await download.saveAs('/path/to/save/at/' + download.suggestedFilename());

      //upload
      //works only with input elements
      //for non-input elements, we have use 'File Chooser'
      await this.page.locator('input element').setInputFiles('file/path/to/upload');
    }

    async alerts() {

    }

    async pageKeyboardPresses() {
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.press('ArrowLeft');
        //upper case A
        await this.page.keyboard.press('Shift+KeyA')
        // inserting text by keyboard
        await this.page.keyboard.insertText('text');
    }



}