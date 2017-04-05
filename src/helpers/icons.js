import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const jokesIcon = (<MaterialIcon name="insert-drive-file" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const largeJokesIcon = (<MaterialIcon name="insert-drive-file" size={50} color="#000" style={statusBarStyles.navLinkIcon} />);
export const setListsIcon = (<MaterialIcon name="list" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const largeSetListsIcon = (<MaterialIcon name="list" size={50} color="#000" style={statusBarStyles.navLinkIcon} />);
export const showsIcon = (<MaterialIcon name="group" size={25} color="#000" style={statusBarStyles.navLinkIcon} />);
export const largeShowsIcon = (<MaterialIcon name="group" size={50} color="#000" style={statusBarStyles.navLinkIcon} />);
export const addJokeIcon = (<MaterialIcon name="note-add" size={25} color="#FFF" style={statusBarStyles.navLinkIcon} />);
export const addSetListIcon = (<MaterialIcon name="playlist-add" size={25} color="#FFF" style={statusBarStyles.navLinkIcon} />);
export const addShowIcon = (<MaterialIcon name="group-add" size={25} color="#FFF" style={statusBarStyles.navLinkIcon} />);

export default {
  jokesIcon,
  setListsIcon,
  showsIcon,
  addJokeIcon
}
