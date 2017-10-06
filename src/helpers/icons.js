import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { normalizeWidth } from '../helpers/sizeHelper';

export const jokesIcon = (<MaterialIcon name="insert-drive-file" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const largeJokesIcon = (<MaterialIcon name="insert-drive-file" size={50} color="#000" style={statusBarStyles.navLinkIcon} />);
export const setListsIcon = (<MaterialIcon name="list" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const largeSetListsIcon = (<MaterialIcon name="list" size={50} color="#000" style={statusBarStyles.navLinkIcon} />);
export const showsIcon = (<MaterialIcon name="group" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const largeShowsIcon = (<MaterialIcon name="group" size={50} color="#000" style={statusBarStyles.navLinkIcon} />);
export const addJokeIcon = (<MaterialIcon name="note-add" size={25} color="#FFF" style={statusBarStyles.navLinkIcon} />);
export const addSetListIcon = (<MaterialIcon name="playlist-add" size={25} color="#FFF" style={statusBarStyles.navLinkIcon} />);
export const addShowIcon = (<MaterialIcon name="group-add" size={25} color="#FFF" style={statusBarStyles.navLinkIcon} />);
export const addIcon = (<MaterialIcon name="add" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const settingsIcon = (<MaterialIcon name="settings" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const aboutIcon = (<MaterialIcon name="help-outline" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const downloadIcon = (<MaterialIcon name="file-download" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const menuIcon = (<MaterialIcon name="menu" size={32} color="#000" style={statusBarStyles.navLinkIcon} />);
export const closeIcon = (<MaterialIcon name="close" size={32} color="#000" style={statusBarStyles.navLinkIcon} />);
export const bulletIcon = (<MaterialIcon name="fiber-manual-record" size={10} color="#000" style={statusBarStyles.navLinkIcon} />);
export const recIcon = (<MaterialIcon name="fiber-smart-record" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const recIconDisabled = (<MaterialIcon name="fiber-smart-record" size={25} color="#AAA" style={statusBarStyles.navLinkIcon} />);
export const recIconBadge = (<MaterialIcon name="fiber-smart-record" size={15} color="#F00" style={statusBarStyles.navLinkIcon} />);
export const timerIcon = (<MaterialIcon name="timer" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const pauseIcon = (<MaterialIcon name="pause" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const stopIcon = (<MaterialIcon name="stop" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const rewindIcon = (<MaterialIcon name="skip-previous" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const rewindIconDisabled = (<MaterialIcon name="skip-previous" size={25} color="#AAA" style={statusBarStyles.navLinkIcon} />);
export const fastForwardIcon = (<MaterialIcon name="skip-next" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const fastForwardIconDisabled = (<MaterialIcon name="skip-next" size={25} color="#AAA" style={statusBarStyles.navLinkIcon} />);
export const back30Icon = (<MaterialIcon name="replay-30" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const back30IconDisabled = (<MaterialIcon name="replay-30" size={25} color="#AAA" style={statusBarStyles.navLinkIcon} />);
export const forward30Icon = (<MaterialIcon name="forward-30" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const forward30IconDisabled = (<MaterialIcon name="forward-30" size={25} color="#AAA" style={statusBarStyles.navLinkIcon} />);
export const playIcon = (<MaterialIcon name="play-arrow" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const backIcon = (<MaterialIcon name="arrow-back" size={normalizeWidth(10)} color="#CCC" style={statusBarStyles.navLinkIcon} />);

export default {
  jokesIcon,
  largeJokesIcon,
  setListsIcon,
  largeSetListsIcon,
  showsIcon,
  largeShowsIcon,
  addJokeIcon,
  addSetListIcon,
  addShowIcon,
  addIcon,
  settingsIcon,
  aboutIcon,
  downloadIcon,
  menuIcon,
  closeIcon,
  bulletIcon,
  recIcon,
  recIconDisabled,
  timerIcon,
  pauseIcon,
  stopIcon,
  rewindIcon,
  rewindIconDisabled,
  fastForwardIcon,
  fastForwardIconDisabled,
  back30Icon,
  back30IconDisabled,
  forward30Icon,
  forward30IconDisabled,
  playIcon,
  backIcon
}
