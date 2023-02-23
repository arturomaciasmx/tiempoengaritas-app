import { NavigatorScreenParams } from "@react-navigation/native";

export type GaritasStackProps = {
  Home: undefined;
  Port: {
    port: {
      number: string;
      name: string;
      crossing_name: string;
      status: string;
    };
    lane: {
      status: string;
      lanes_open: string;
      delay_minutes: string;
      type: string;
      is_readylane: boolean;
      image: any | undefined;
    };
  };
  Post: {
    port: {
      crossing_name: string;
      number: string;
    };
    lane: {
      type: string;
      is_readylane: string;
    };
  };
  Comment: {
    user_name: string;
    post_id: string;
  };
  CommentsList: {};
};
export type AuthStackProps = {
  Login: undefined;
  SignUp: undefined;
};

export type DefaultDrawerProps = {
  GaritasStack: NavigatorScreenParams<GaritasStackProps>;
  Cities: undefined;
  About: undefined;
  AuthStackScreen: AuthStackProps;
};

export type Port = {
  port: {
    number: string;
    name: string;
    crossing_name: string;
    status: string;
    vehicle_lanes: {
      standard_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
      ready_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
    };
    pedestrian_lanes: {
      standard_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
      ready_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
    };
  };
};

export type LaneProps = {
  port: {
    number: string;
    name: string;
    crossing_name: string;
    status: string;
  };
  lane: {
    status: string;
    lanes_open: string;
    delay_minutes: string;
    type: string;
    is_readylane: boolean;
  };
};