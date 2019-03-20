// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// greeting.js defines the greeting dialog

// Import required Bot Builder
const { ComponentDialog, WaterfallDialog, TextPrompt } = require('botbuilder-dialogs');

// User state for greeting dialog
const { RouterInfo } = require('./Router_Info');

const DIALOG_STATE_PROPERTY = 'dialogState';
const USER_PROFILE_PROPERTY = 'user';

const WHO_ARE_YOU = 'who_are_you';
const HELLO_USER = 'hello_user';

const NAME_PROMPT = 'name_prompt';
const CONFIRM_PROMPT = 'confirm_prompt';
const AGE_PROMPT = 'age_prompt';

/**
 * Demonstrates the following concepts:
 *  Use a subclass of ComponentDialog to implement a multi-turn conversation
 *  Use a Waterfall dialog to model multi-turn conversation flow
 *  Use custom prompts to validate user input
 *  Store conversation and user state
 *
 * @param {String} dialogId unique identifier for this dialog instance
 * @param {PropertyStateAccessor} userProfileAccessor property accessor for user state
 */
class RouterInfo extends ComponentDialog {
    constructor(conversationState, userState) {
        // Create a new state accessor property. See https://aka.ms/about-bot-state-accessors to learn more about bot state and state accessors.
        this.conversationState = conversationState;
        this.userState = userState;
    
        this.dialogState = this.conversationState.createProperty(DIALOG_STATE_PROPERTY);
    
        this.userProfile = this.userState.createProperty(USER_PROFILE_PROPERTY);
    
        this.dialogs = new DialogSet(this.dialogState);
    
        // Add prompts that will be used by the main dialogs.
        this.dialogs.add(new TextPrompt(NAME_PROMPT));
        this.dialogs.add(new ChoicePrompt(CONFIRM_PROMPT));
        this.dialogs.add(new NumberPrompt(AGE_PROMPT, async (prompt) => {
            if (prompt.recognized.succeeded) {
                if (prompt.recognized.value <= 0) {
                    await prompt.context.sendActivity(`Your age can't be less than zero.`);
                    return false;
                } else {
                    return true;
                }
            }
            return false;
        }));
    
        // Create a dialog that asks the user for their name.
        this.dialogs.add(new WaterfallDialog(WHO_ARE_YOU, [
            this.promptForName.bind(this),
            this.confirmAgePrompt.bind(this),
            this.promptForAge.bind(this),
            this.captureAge.bind(this)
        ]));
    
        // Create a dialog that displays a user name after it has been collected.
        this.dialogs.add(new WaterfallDialog(HELLO_USER, [
            this.displayProfile.bind(this)
        ]));
    }
    // This step in the dialog prompts the user for their name.
    async promptForName(step) {
        return await step.prompt(NAME_PROMPT, `What is your name, human?`);
    }

    // This step captures the user's name, then prompts whether or not to collect an age.
    async confirmAgePrompt(step) {
        const user = await this.userProfile.get(step.context, {});
        user.name = step.result;
        await this.userProfile.set(step.context, user);
        await step.prompt(CONFIRM_PROMPT, 'Do you want to give your age?', ['yes', 'no']);
    }

    // This step checks the user's response - if yes, the bot will proceed to prompt for age.
    // Otherwise, the bot will skip the age step.
    async promptForAge(step) {
        if (step.result && step.result.value === 'yes') {
            return await step.prompt(AGE_PROMPT, `What is your age?`,
                {
                    retryPrompt: 'Sorry, please specify your age as a positive number or say cancel.'
                }
            );
        } else {
            return await step.next(-1);
        }
    }

    // This step captures the user's age.
    async captureAge(step) {
        const user = await this.userProfile.get(step.context, {});
        if (step.result !== -1) {
            user.age = step.result;
            await this.userProfile.set(step.context, user);
            await step.context.sendActivity(`I will remember that you are ${ step.result } years old.`);
        } else {
            await step.context.sendActivity(`No age given.`);
        }
        return await step.endDialog();
    }

    // This step displays the captured information back to the user.
    async displayProfile(step) {
        const user = await this.userProfile.get(step.context, {});
        if (user.age) {
            await step.context.sendActivity(`Your name is ${ user.name } and you are ${ user.age } years old.`);
        } else {
            await step.context.sendActivity(`Your name is ${ user.name } and you did not share your age.`);
        }
        return await step.endDialog();
    }
}

exports.RouterInfo = Greeting;
