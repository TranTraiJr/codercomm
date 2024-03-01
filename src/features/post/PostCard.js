import React from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "./postSlice";
import EditPostForm from "./EditPostForm";

function PostCard({ post, postId, userId }) {
  const { isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  console.log(post);
  console.log(postId);

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <Modal>
            <Menus.Menus>
              <Menus.Toggle id={postId} />
              <Menus.List id={postId}>
                <Modal.Open opens="delete">
                  <Menus.Button icon={<FaRegTrashAlt />}>Delete</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<FaEdit />}>Edit</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menus>
            <Modal.Window name="delete">
              <ConfirmDelete
                disabled={isLoading}
                resourceName="post"
                onConfirm={() => {
                  console.log(postId);
                  dispatch(deletePost({ postId, userId }));
                }}
              />
            </Modal.Window>
            <Modal.Window name="edit">
              <EditPostForm post={post} postId={postId} userId={userId} />
            </Modal.Window>
          </Modal>
        }
      />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
