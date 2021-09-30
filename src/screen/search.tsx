
import React, { useState, useEffect, useCallback, Fragment } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, Button,
} from 'react-native';
import { RootStackParamList } from '../../Type';
import { StackScreenProps } from '@react-navigation/stack';
import FilterableList from '../components/filterableList/filterableList';
import { parseSearchQuery } from '../utils/searchQueryHelper';
import { ADVERT_SEARCH_API } from '../utils/network';
import { useSelector } from 'react-redux';
import { trans } from '../utils/common';

type Props = StackScreenProps<RootStackParamList, 'Search'>;

export default function Search({ route, navigation }: Props) {
  const texts = useSelector(state => state.localization.texts)
  const { catId, searchTermFlag, searchQuery } = route.params;
  const query = catId ? `cid=${catId}&sf=dpo&so=d` :
    (searchTermFlag ? `sf=dpo&so=d` : searchQuery);
  const queryParsed = parseSearchQuery(query);

  return (
    <Fragment>
      <FilterableList
        categoryFilter={queryParsed.categoryFilter}
        commonFilter={queryParsed.commonFilter}
        shortType={queryParsed.shortType || "dpo|d"}
        isSearchAdvert={true}
        filterApi={ADVERT_SEARCH_API}
        lng={"de"}
        navigation={navigation}
        searchTermFlag={searchTermFlag}
        nocontent={{
          title: trans("apps.noresults.createnotification", texts),
          description: trans("apps.noresults.createnotification.description", texts),
          buttonText: trans("apps.notification.enable", texts),
          onButtonClick: () => { }
        }}
      />
    </Fragment>
  );
}