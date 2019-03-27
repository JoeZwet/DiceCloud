import getCollectionByName from '/imports/api/parenting/getCollectionByName.js';
import updateDecendents from '/imports/api/parenting/parenting.js';

// 1 + n database hits
export function softRemove({id, collection}){
  let removalDate = new Date();
  // Remove this document
  collection = getCollectionByName(collection);
  collection.update(id, {$set: {
    removed: true,
    removedAt: removalDate,
  }, $unset: {
    removedWith: 1,
  }});
  // Remove all the decendents that have not yet been removed, and set them to be
  // removed with this document
  updateDecendents({
    ancestorId: id,
    filter: {removed: {$ne: true}},
    modifier: {$set: {
      removed: true,
      removedAt: removalDate,
      removedWith: id,
    }},
  });
};

const restoreError = function(){
  throw new Meteor.Error('restore-failed',
    'Could not restore this document, maybe it was removed by a parent?'
  );
};

export function restore({id, collection}){
  collection = getCollectionByName(collection);
  let numUpdated = collection.update({
    _id: id,
    removedWith: {$exists: false}
  }, { $unset: {
    removed: 1,
    removedAt: 1,
  }});
  if (numUpdated === 0) restoreError();
  updateDecendents({
    ancestorId: id,
    filter: {
      removedWith: id,
    },
    modifier: { $unset: {
      removed: 1,
      removedAt: 1,
      removedWith: 1,
    }},
  });
}