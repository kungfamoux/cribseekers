import { SearchSuggestion } from '../types/search-result.type';

export class SearchSuggestionEntity implements SearchSuggestion {
  id: string;
  type: 'state' | 'city' | 'lga' | 'estate' | 'district';
  name: string;
  state?: string;
  city?: string;
  count: number;

  constructor(data: Partial<SearchSuggestion>) {
    Object.assign(this, data);
  }
}
