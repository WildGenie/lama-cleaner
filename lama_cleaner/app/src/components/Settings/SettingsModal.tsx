import React from 'react'

import { useRecoilState, useRecoilValue } from 'recoil'
import {
  isPaintByExampleState,
  isSDState,
  settingState,
} from '../../store/Atoms'
import Modal from '../shared/Modal'
import ManualRunInpaintingSettingBlock from './ManualRunInpaintingSettingBlock'
import HDSettingBlock from './HDSettingBlock'
import ModelSettingBlock from './ModelSettingBlock'
import DownloadMaskSettingBlock from './DownloadMaskSettingBlock'
import useHotKey from '../../hooks/useHotkey'

interface SettingModalProps {
  onClose: () => void
}
export default function SettingModal(props: SettingModalProps) {
  const { onClose } = props
  const [setting, setSettingState] = useRecoilState(settingState)
  const isSD = useRecoilValue(isSDState)
  const isPaintByExample = useRecoilValue(isPaintByExampleState)

  const handleOnClose = () => {
    setSettingState(old => {
      return { ...old, show: false }
    })
    onClose()
  }

  useHotKey(
    's',
    () => {
      setSettingState(old => {
        return { ...old, show: !old.show }
      })
    },
    {},
    []
  )

  return (
    <Modal
      onClose={handleOnClose}
      title="Settings"
      className="modal-setting"
      show={setting.show}
    >
      {isSD || isPaintByExample ? <></> : <ManualRunInpaintingSettingBlock />}

      {/* <GraduallyInpaintingSettingBlock /> */}
      <DownloadMaskSettingBlock />
      <ModelSettingBlock />
      {isSD ? <></> : <HDSettingBlock />}
    </Modal>
  )
}
