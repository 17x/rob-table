// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((arg, sender, sendResponse) => {
    console.log('background onmessage ', arg, sender, sendResponse)
    chrome.downloads.download({
      url: arg.file, // The object URL can be used as download URL
      //...
      filename: arg.fileName
    })
  })
})