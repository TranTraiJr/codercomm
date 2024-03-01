import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import Menus from "../../ui/Menus";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment, commentId, postId }) {
  const { isLoading } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
          <Modal>
            <Menus.Menus>
              <Menus.Toggle id={commentId} />
              <Menus.List id={commentId}>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<FaRegTrashAlt />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menus>
            <Modal.Window name="delete">
              <ConfirmDelete
                disabled={isLoading}
                resourceName="comment"
                onConfirm={() => {
                  console.log(comment._id);
                  dispatch(deleteComment({ postId, commentId }));
                }}
              />
            </Modal.Window>
          </Modal>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
