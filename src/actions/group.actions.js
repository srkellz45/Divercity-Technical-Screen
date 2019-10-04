import Axios from 'axios';
import { url } from '../lib/url';
import history from '../history';
import { toast } from "react-toastify";

const newGroupURL = `${url}group_of_interests`;
const getOnboardingGroupsURL = `${url}group_of_interests/onboarding?page[number]=0&page[size]=12`;
const followGroupsOnboardingURL = `${url}group_of_interests/`;
const followGroupURL = `${url}group_of_interests/`;
const getFollowingGroupsURL = `${url}group_of_interests/following`;
const getMyGroupsURL = `${url}group_of_interests/my_groups`;
const getOtherUserGroupsURL = `${url}group_of_interests/followed_by/`;
const editGroupURL = `${url}group_of_interests/`;
const getQuestionsURL = `${url}questions?filter_by_user_groups=true`;
const getGroupDetail = `${url}group_of_interests/`;
const getSingleGroupQuestionsURL = `${url}questions`;
const getRecommendedGroupsURL = `${url}recommenders/group_of_interests?page[number]=0&page[size]=6`;
const getTrendingGroupsURL = `${url}group_of_interests/trending?page[number]=0&page[size]=5`;
const getGroupsURL = `${url}group_of_interests?page[number]=0&page[size]=20`;
const loadMoreURL = `${url}group_of_interests?page[number]=`;
const getQuestionsByGroupURL = `${url}questions?group_id=`;
const loadGroupAdminsURL = `${url}group_of_interests/`;
const deleteGroupURL = `${url}group_of_interests/`;
const setGroupAdminURL = `${url}group_of_interests/create_group_admin`;

const getGroupRequestsURL = `${url}group_of_interests/requests`;
const getGroupInvitesURL = `${url}group_of_interests/my_invites`;

const privateGroupRequestURL = `${url}group_of_interests/`;

//api/group_of_interests/:group_id/unfollow
export const CREATE_NEW_GROUP = 'CREATE_NEW_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const GET_GROUPS = 'GET_GROUPS';
export const GET_OTHER_USER_GROUPS = 'GET_OTHER_USER_GROUPS';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const DELETE_GROUP = 'DELETE_GROUP';
export const FOLLOW_GROUP = 'FOLLOW_GROUP';
export const UN_FOLLOW_GROUP = 'UN_FOLLOW_GROUP';
export const FOLLOW_PEOPLE_GROUP = 'FOLLOW_PEOPLE_GROUP';
export const FOLLOW_REC_GROUP = 'FOLLOW_REC_GROUP';
export const LOAD_RECOMMENDED_GROUPS = 'LOAD_RECOMMENDED_GROUPS';
export const LOAD_TRENDING_GROUPS = 'LOAD_TRENDING_GROUPS';
export const LOAD_SINGLE_GROUP = 'LOAD_SINGLE_GROUP';
export const LOAD_QUESTIONS_BY_GROUP = 'LOAD_QUESTIONS_BY_GROUP';
export const LOAD_MORE_GROUPS = 'LOAD_MORE_GROUPS';
export const LOAD_GROUP_ADMINS = 'LOAD_GROUP_ADMINS';
export const LOAD_GROUP_MEMBERS = 'LOAD_GROUP_MEMBERS';
export const REQUEST_GROUP_ACCESS = 'REQUEST_GROUP_ACCESS';
export const GET_GROUP_REQUESTS = 'GET_GROUP_REQUESTS';
export const GET_GROUP_INVITES = 'GET_GROUP_INVITES';
export const ERROR = 'ERROR';

const headers = () => ({
  'access-token': localStorage.getItem('access-token'),
  uid: localStorage.getItem('uid'),
  client: localStorage.getItem('client'),
  id: localStorage.getItem('id')
});


// "title" : "title",
// "description" : "group description",
// "group_type" : "groupType (one of two values :public or private)",
// "picture" : "image_Data"

export const createGroup = (newGroup) => {
  let ID;
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: newGroupURL,
      headers: headers(),
      data: { "group_of_interest": newGroup }
    })
    .then(response => {

      if(response.status === 422) {
        toast.error(`Something went wrong :-(`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
      if(response.status === 201) {
        ID = response.data.data.id;
        history.push(`/groups/${ID}`);
        return Axios({
          method: 'get',
          url: getGroupDetail + ID,
          headers: headers()
        })
        .then(response => {
          dispatch({
            type: LOAD_SINGLE_GROUP,
            group: response.data.data
          });
          if(response.status === 200) {
            return Axios({
              method: 'get',
              url: loadGroupAdminsURL + ID + `/members`,
              headers: headers()
              })
            .then(members => {
              dispatch({
                type: LOAD_GROUP_MEMBERS,
                member: members.data.data,
              });
              if(members.status === 200) {
                return Axios({
                  method: 'get',
                  url: loadGroupAdminsURL + ID + `/admins`,
                  headers: headers()
                  })
                .then(admins => {
                  dispatch({
                    type: LOAD_GROUP_ADMINS,
                    admin: admins.data.data,
                  });
                })
                .catch(err => {
                  dispatch({
                    type: ERROR,
                    error: err
                  });
                });
              }
            });
          }
        });
      }
    })
    .catch(err => {
      toast.error(`Something went wrong...`, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
      });
      console.log(err, "ERROR");
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const editGroup = (groupData, groupID) => {
  console.log(groupData);
  return (dispatch) => {
    return Axios({
      method: 'put',
      url: editGroupURL + groupID,
      headers: headers(),
      data: { "group_of_interest": groupData }
    })
    .then((response) => {
      console.log(response);
      if(response.status === 200) {
        dispatch({
          type: EDIT_GROUP,
          group: response.data.data
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: 'Group Failed to edit'
      });
    });
  };
};
export const loadSingleGroup = (id) => {
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getGroupDetail + id,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: LOAD_SINGLE_GROUP,
        group: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadQuestionsByGroup = (id) => {
  console.log(id);
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getQuestionsByGroupURL + id,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: LOAD_QUESTIONS_BY_GROUP,
        questions: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadQuestions = () => {
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getQuestionsURL,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_QUESTIONS,
        questions: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
// export const getSingleGroupQuestions = () => {
//   return(dispatch) => {
//     return Axios({
//       method: 'get',
//       url: getSingleGroupQuestionsURL,
//       headers: headers()
//     })
//     .then(response => {
//       console.log(response);
//       dispatch({
//         type: GET_QUESTIONS,
//         questions: response.data.data
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({
//         type: ERROR,
//         error: err
//       });
//     });
//   };
// };
export const loadFollowingGroups = () => {
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getFollowingGroupsURL,
      headers: headers()
    })
    .then(response => {
      dispatch({
        type: GET_GROUPS,
        groups: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadOnboardingGroups = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getOnboardingGroupsURL,
      headers: headers()
    })
    .then(response => {
        dispatch({
          type: GET_GROUPS,
          groups: response.data.data
       });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadRecommendedGroups = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getRecommendedGroupsURL,
      headers: headers()
      })
    .then(groups => {
      dispatch({
        type: LOAD_RECOMMENDED_GROUPS,
        groups: groups.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const followPeopleGroup = (groupID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: followGroupURL + groupID + `/follow`,
      data: { "industry_ids": groupID },
      headers: headers()
    })
    .then(response => {
     if(response.status === 200) {
      return Axios({
        method: 'get',
        url: getGroupsURL,
        headers: headers()
      })
      .then(response => {
        toast.success(`Group Joined`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
        dispatch({
          type: FOLLOW_PEOPLE_GROUP,
          group: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          error: err
        });
      });
     }
   });
  };
};
export const getGroups = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getGroupsURL,
      headers: headers()
      })
    .then(groups => {
      dispatch({
        type: GET_GROUPS,
        groups: groups.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const getMoreGroups = (page) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: loadMoreURL + page + `&page[size]=20`,
      headers: headers()
      })
    .then(groups => {
      if(groups.data.data.length === 0) {
        localStorage.setItem('groupsEmpty', true);
      }
      dispatch({
        type: LOAD_MORE_GROUPS,
        groups: groups.data.data,
        page: groups.data.meta.total_pages,
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


export const loadTrendingGroups = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getTrendingGroupsURL,
      headers: headers()
      })
    .then(groups => {
      dispatch({
        type: LOAD_TRENDING_GROUPS,
        groups: groups.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const followGroup = (groupID, where, userID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: followGroupURL + groupID + `/follow`,
      data: { "industry_ids": groupID },
      headers: headers()
    })
    .then(response => {
     if(response.status === 200) {
      return Axios({
        method: 'get',
        url: getGroupDetail + groupID,
        headers: headers()
      })
      .then(response => {
        dispatch({
          type: FOLLOW_GROUP,
          group: response.data.data
        });
        if(response.status === 200 && where === "userProfile") {
          return Axios({
            method: 'get',
            url: getOtherUserGroupsURL + userID,
            headers: headers()
          })
          .then(response => {
            dispatch({
              type: GET_OTHER_USER_GROUPS,
              groups: response.data.data
            });
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          error: err
        });
      });
     }
   });
  };
};
export const leaveGroup = (groupID) => {
  return (dispatch) => {
    return Axios({
      method: 'delete',
      url: followGroupURL + groupID + `/unfollow`,
      headers: headers()
    })
    .then(response => {
     if(response.status === 200) {
      return Axios({
        method: 'get',
        url: getGroupDetail + groupID,
        headers: headers()
      })
      .then(response => {
        dispatch({
          type: UN_FOLLOW_GROUP,
          group: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          error: err
        });
      });
     }
   });
  };
};

export const requestGroupAccess = (groupID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: followGroupURL + groupID + `/join`,
      data: { "industry_ids": groupID },
      headers: headers()
    })
    .then(response => {
      if(response.status === 200) {
        return Axios({
          method: 'get',
          url: getRecommendedGroupsURL,
          headers: headers()
        })
        .then(groups => {
          dispatch({
            type: REQUEST_GROUP_ACCESS,
            group: groups.data.data
          });
        })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          error: err
        });
      });
     }
   });
  };
};
export const followGroupsOnboarding = (groupID, id) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: followGroupsOnboardingURL + groupID + `/follow`,
      data: { "industry_ids": groupID },
      headers: headers()
    })
    .then(response => {
      // dispatch({
      //   type: FOLLOW_REC_GROUP,
      //   recGroup: response.data.data
      // });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const followRecommendedGroups = (groupID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: followGroupsOnboardingURL + groupID + `/follow`,
      data: { "industry_ids": groupID },
      headers: headers()
    })
    .then(response => {
     if(response.status === 200) {
      return Axios({
        method: 'get',
        url: getRecommendedGroupsURL,
        headers: headers()
      })
      .then(groups => {
        dispatch({
          type: FOLLOW_REC_GROUP,
          recGroup: groups.data.data
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ERROR,
          error: err
        });
      });
     }
   });
  };
};
export const loadGroupMembers = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: loadGroupAdminsURL + ID + `/members`,
      headers: headers()
      })
    .then(members => {
      dispatch({
        type: LOAD_GROUP_MEMBERS,
        member: members.data.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
export const loadGroupAdmins = (ID) => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: loadGroupAdminsURL + ID + `/admins`,
      headers: headers()
      })
    .then(admins => {
      dispatch({
        type: LOAD_GROUP_ADMINS,
        admin: admins.data.data,
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const deleteGroup = (id) => {
  return(dispatch) => {
    return Axios({
      method: 'delete',
      url: deleteGroupURL + id,
      headers: headers()
    })
    .then(response => {
      if(response.status === 204) {
        history.push(`/feed`);
        toast.success(`Group Deleted`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


export const getOtherUserGroups = (id) => {
  return(dispatch) => {
    return Axios({
      method: 'get',
      url: getOtherUserGroupsURL + id,
      headers: headers()
    })
    .then(response => {
      console.log(response.data.data);
      dispatch({
        type: GET_OTHER_USER_GROUPS,
        groups: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const getGroupRequests = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getGroupRequestsURL,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_GROUP_REQUESTS,
        requests: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const getGroupInvites = () => {
  return (dispatch) => {
    return Axios({
      method: 'get',
      url: getGroupInvitesURL,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      dispatch({
        type: GET_GROUP_INVITES,
        invites: response.data.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};
// followGroup(params) {
//     const { users, group_id, invite_type } = params;
//     return axios({
//       method: 'post',
//       url: `${url }/group_of_interests/${group_id}/follow`,
//       data: {
//         group_invite: {
//           users, // this should be an array with current user...
//           invite_type, // 'in_app_invite'
//           group_id // integer
//         }
//       },
//       headers: headers()
//     });
//   },
export const acceptPrivateGroupRequest = (groupID, userID) => {
  return(dispatch) => {
    return Axios({
      method: 'post',
      url: privateGroupRequestURL + groupID + `/accept/` + userID,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
        toast.success(`Request Accepted`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
        return Axios({
          method: 'get',
          url: getGroupRequestsURL,
          headers: headers()
        })
        .then(response => {
          console.log(response);
          dispatch({
            type: GET_GROUP_REQUESTS,
            requests: response.data.data
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: ERROR,
            error: err
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const declinePrivateGroupRequest = (groupID, userID) => {
  return(dispatch) => {
    return Axios({
      method: 'post',
      url: privateGroupRequestURL + groupID + `/decline/` + userID,
      headers: headers()
    })
    .then(response => {
      console.log(response);
      if(response.status === 200) {
        toast.success(`Request Declined`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
        return Axios({
          method: 'get',
          url: getGroupRequestsURL,
          headers: headers()
        })
        .then(response => {
          console.log(response);
          dispatch({
            type: GET_GROUP_REQUESTS,
            requests: response.data.data
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: ERROR,
            error: err
          });
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

export const setGroupAdmin = (groupID, userID) => {
  return (dispatch) => {
    return Axios({
      method: 'post',
      url: setGroupAdminURL,
      data: {
        "group_of_interest_id" : groupID,
        "user_id": userID,
        "permission_type" : "regular_admin",
      },
      headers: headers()
    })
    .then(response => {
     if(response.status === 201) {
      toast.success(`${response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
          hideProgressBar: true,
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};

