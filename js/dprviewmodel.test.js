const setupMockDprModules = () => {
  window.DPR_convert_mod = { convert: () => { }, savePad: () => { } }
  window.DPR_sortaz_mod = { sortaz: () => { } }
  window.DPR_translit_mod = { toVel: () => { }, toUni: () => { }, translit: () => { } }
  window.DPR_send_bottom_mod = { sendTextPad: () => { } }
  window.DPR_translate_mod = { translateText: () => { }, translateTextFromBottomPane: () => { }, insertWordByWord: () => { } }
  window.DPR_conjugate_mod = { insertConj: () => { } }
  window.DPR_Mediator = { emit: () => { } }
}

describe('DPR_keypress', () => {
  test('capital R (but not lowercase r) resets settings', async () => {
    setupMockDprModules()

    const dprVM = await import('./dprviewmodel.js')

    const cmd = dprVM.DprKeyboardHandler({ key: 'R' })
    expect(cmd).not.toBeNull()
    expect(cmd.id).toBe(window.DPR_CMD_RESET_SETTINGS)
  })
})
