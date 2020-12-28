import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      // dashboard
      background: string;
      mainText: string;
      defaultRepositoryTitle: string;
      dashboardRepositoryDescription: string;
      dashboardRepositoryBackground: string;
      chevronColor: string;
      // issues main page
      issuesMainDescription: string;
      issuesStatsLabel: string;
      // issues cards
      issuesCardBackground: string;
      issuesCardDescription: string;
    };
  }
}
