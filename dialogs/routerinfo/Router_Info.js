// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * Simple router profile class.
 */
class RouterInfo {
    constructor(name, type, offer, firmware) {
        this.name = name || undefined;
        this.type = type || undefined;
        this.offer = offer || undefined;
        this.firmware = firmware || undefined;
    }
};

exports.UserProfile = UserProfile;
